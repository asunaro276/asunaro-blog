import cheerio from 'cheerio'
import openGraphScraper from 'open-graph-scraper'
import hljs from 'highlight.js/lib/common'

export const parseBody = async (body: string) => {
  const $ = cheerio.load(body)
  $('h1').each((_, element) => {
    $(element).attr('id', $(element).text() + 'h1')
    $(element).addClass('ml-4 md:ml-8 my-3 md:my-5 text-lg md:text-xl font-semibold font-body')
    $(element).wrap('<div class="bg-slate-100 mt-10 flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })
  $('h2').each((_, element) => {
    $(element).attr('id', $(element).text() + 'h2')
    $(element).addClass('ml-3 md:ml-4 my-1 md:my-2 text-base md:text-lg font-semibold font-body')
    $(element).wrap('<div class="flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-yellow-400"></div>')
  })
  $('h3').each((_, element) => {
    $(element).attr('id', $(element).text() + 'h3')
    $(element).addClass('text-base md:text-lg font-semibold font-body')
  })
  $('p').each((_, element) => {
    $(element).addClass('text-sm md:text-lg font-body leading-loose')
    $(element).wrap('<div class=""></div>')
  })

  $('li').each((_, element) => {
    $(element).addClass('font-body')
  })

  $('ol').each((_, element) => {
    $(element).addClass('list-inside space-y-2 ml-2 pl-8 indent-[-1em]')
  })

  $('ul:not(ul ul)').each((_, element) => {
    $(element).addClass(
      'text-sm md:text-lg list-disc list-inside space-y-2 ml-2 pl-8 pr-4 indent-[-1em] border-dotted border-gray-500',
    )
  })

  $('ul ul').each((_, element) => {
    $(element).addClass('text-sm md:text-lg list-inside space-y-2 ml-2 pl-4 indent-[-1em]')
    $(element).attr('style', 'list-style-type: circle;')
  })

  $('code:not(pre code)').each((_, element) => {
    $(element).addClass('bg-slate-200 px-1 py-[0.1rem] rounded text-red-600 font-code')
  })

  $('blockquote').each((_, element) => {
    $(element).addClass('ml-4 text-xl opacity-90 font-body')
    $(element).wrap('<div class="flex"></div>')
    $(element).parent().prepend('<div class="w-2 bg-slate-200"></div>')
  })

  $('img').each((_, element) => {
    $(element).addClass('max-w-[90%]')
  })

  $('pre code').each((_, element) => {
    const result = hljs.highlightAuto($(element).text()).value
    $(element).html(result)
    $(element).parent().addClass('shadow-md text-sm md:text-base relative')
    $(element).addClass(`hljs mb-10`)
    $(element).parent().prepend('<div class="clipboard absolute right-[16px] top-[16px]" style="display: none"><div class="copied text-white mr-0.5 font-sans">copied!</div><svg class="hover:opacity-70 active:mt-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8f9398"><path d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360Zm0-72h384v-480H360v480ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-552h72v552h456v72H216Zm144-216v-480 480Z"/></svg></div>')
  })

  const links = $('a')
  for (let i = 0; i < links.length; i++) {
    const element = $(links[i])
    if ($(element).text() === 'linkCard') {
      let og: { [key: string]: string } = {}
      const linkUrl = $(element).attr('href') as string
      try {
        const options = { url: linkUrl, timeout: 60 }
        const ogData = await openGraphScraper(options)
        og['title'] = ogData.result['ogTitle'] as string
        if (og['title'].match(/Amazon/)) {
          og['image'] = (ogData.result['ogImage'])?.find((value) =>
            value.url.match(/media-amazon.com\/images\/I/),
          )?.url as string
        } else {
          og['image'] = (ogData.result['ogImage'])![0].url as string
        }
        if (og['image'] === undefined) {
          og['image'] = ogData.result['favicon'] as string
        }
        if (!og['image'].startsWith('http')) {
          og['image'] = `${linkUrl.split('/').slice(0, 3).join('/')}${og['image']}`
        }
        og['description'] = ogData.result['ogDescription'] as string
        if (og['title'] === undefined) {
          const res = await fetch(linkUrl)
          const data = await res.text()
          const $link = cheerio.load(data)
          $link('meta[property^="og"]').each((_, element) => {
            og[$link(element).attr('property')?.replace('og:', '') as string] = $link(element).attr(
              'content',
            ) as string
          })
          if (og['image'] === undefined) {
            og[
              'image'
            ] = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${linkUrl}`
          }
          $link('meta[name="title"]').each((_, element) => {
            if (og[$link(element).attr('name') as string] === undefined) {
              og[$link(element).attr('name') as string] = $link(element).attr('content') as string
            }
          })
          if (og['title'] === undefined) {
            $link('title').each((_, element) => {
              og['title'] = $link(element).text() as string
            })
          }
          $link('meta[name="description"]').each((_, element) => {
            if (og[$link(element).attr('name') as string] === undefined) {
              og[$link(element).attr('name') as string] = $link(element).attr('content') as string
            }
          })
        }
      } catch (error) {
        console.error(error)
      }
      $(element).replaceWith(`
        <div class="shadow-md shadow-outline bg-slate-100 mt-4 mb-20 hover:brightness-[0.9] duration-300 ease-out">
          <a class="no-underline" href=${linkUrl} target="_blank" rel="noopener noreferrer">
            <div class="flex flex-col lg:flex-row items-center justify-center p-2">
              <img src=${
                og['image'] === undefined ? '' : og['image']
              } class="self-center w-[90%] max-w-[12rem] max-h-[20rem] mt-2 lg:mt-2 lg:mr-3" />
              <div class="flex flex-col w-[90%] lg:w-1/2 justify-center items-center">
                <p class="font-bold my-3 w-full break-words">
                  ${og['title'] === undefined ? '' : og['title']}
                </p> 
                <p class="text-sm text-black m-0 w-full break-words">
                  ${og['description'] === undefined ? '' : og['description']}
                </p>
              </div>
            </div>
          </a>
        </div>
        `)
    }
  }
  return $('body').html() as string
}
