import { genSiteTitle } from "~/lib/utils";
import type { Route } from "./+types/_index";
import { AuroraText } from "~/components/ui/aurora-text";
import TextType from "~/components/TextType";
export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: genSiteTitle("其实你知的我是那面") }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
        Hi! <AuroraText>I'm 赤琦.</AuroraText>
      </h1>
      <TextType
        text={["凡所有相，皆是虚妄", "New Youth, New Vision."]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
        className="text-4xl text-black"
        textColors={["#ff0000", "#00ff00", "#0000ff"]}
      />
      {/* 轮播图部分 - 使用语义化标签 */}
      <section className="showcase relative">
        <div className="overflow-hidden">
          {/* {allCarousel.nodes.map(({ id, title, link, cover, description }) => (
            <div
              key={id}
              className="carousel-item cursor-pointer"
              onClick={handlePush(link ?? "")}
            >
              <img
                className="block w-full mx-auto px-6 max-w-[1024px] lg:pb-[120px]"
                alt={title ?? ""}
                title={title ?? ""}
                src={cover ?? ""}
              />
              <div className="carousel-caption px-6 text-center">
                <h4 className="text-transparent bg-clip-text bg-gradient-to-t from-[#fcc5e4] via-[#fda34b] via-[#ff7882] via-[#c8699e] via-[#7046aa] via-[#0c1db8] to-[#020f75]">
                  {title}
                </h4>
                <p className="text-transparent bg-clip-text bg-gradient-to-t from-[#fcc5e4] via-[#fda34b] via-[#ff7882] via-[#c8699e] via-[#7046aa] via-[#0c1db8] to-[#020f75]">
                  {description}
                </p>
              </div>
            </div>
          ))} */}
        </div>
      </section>

      <div className="container-fluid">
        {/* 头部图像 */}
        <div className="flex justify-center py-6">
          <img
            src="/img/gopher_head.png"
            alt="Gopher Head"
            className="w-[16rem]"
          />
        </div>

        {/* 关于我部分 */}
        <section className="index-module-1 text-center text-white bg-[url('/img/index-bg.jpeg')] bg-center bg-cover bg-fixed mb-[6rem] pt-8">
          <div className="max-w-[1024px] mx-auto">
            <h2 className="text-2xl font-bold mb-2">I'm RedBlue.</h2>
            <h3 className="slogan font-redblue text-xl">你好，我是赤琦。</h3>
          </div>

          {/* 内容区块 */}
          <div className="relative translate-y-[4rem] max-w-[1024px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              {/* 博文区块 */}
              <div className="index-module-1__content__block bg-primary-light bg-[url('/img/undraw_annotation.svg')] bg-contain bg-center bg-no-repeat bg-origin-content min-h-[22.25rem] p-[1rem_1.4rem] transition-all duration-300 hover:shadow-xl hover:z-50">
                <dl className="bg-[rgba(33,150,243,0.618)]">
                  <dt className="mb-4">
                    <h4 className="text-xl">·&nbsp;博文&nbsp;·</h4>
                  </dt>
                  {/* {allMarkdownRemark?.nodes?.map((node: any) => (
                    <dd key={node.id} className="text-light mb-2">
                      <a
                        className="block truncate text-reset text-decoration-none"
                        href={
                          node?.frontmatter?.slug || node?.fields?.slug || ""
                        }
                        title={
                          node?.frontmatter?.description || node.excerpt || ""
                        }
                        target="_blank"
                      >
                        {node?.frontmatter?.title}
                        <small className="block truncate">
                          {node?.frontmatter?.author} -{" "}
                          {node?.frontmatter?.date}
                        </small>
                      </a>
                    </dd>
                  ))} */}
                </dl>
              </div>

              {/* 项目区块 */}
              <div className="index-module-1__content__block text-dark bg-white bg-[url('/img/undraw_developer_activity.svg')] bg-contain bg-center bg-no-repeat bg-origin-content min-h-[22.25rem] p-[1rem_1.4rem] transition-all duration-300 hover:shadow-xl hover:z-50">
                <dl className="bg-[rgba(255,255,255,0.618)]">
                  <dt className="mb-4">
                    <h4 className="text-xl">·&nbsp;项目&nbsp;·</h4>
                  </dt>
                  {/* {repositories.length === 0 && (
                    <dd>
                      <p className="masked">
                        🏃‍♂️ 从 github.com/redblue9771 拉取中…
                      </p>
                    </dd>
                  )}
                  {repositories.map(({ name, description, url }) => (
                    <dd key={name} className="mb-2">
                      <a
                        href={url}
                        className="block truncate text-reset text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {name}
                        <small className="block truncate">
                          {description || "No Description"}
                        </small>
                      </a>
                    </dd>
                  ))} */}
                </dl>
              </div>

              {/* 关于区块 */}
              <div className="index-module-1__content__block bg-primary-light bg-[url('/img/undraw_profile.svg')] bg-contain bg-center bg-no-repeat bg-origin-content min-h-[22.25rem] p-[1rem_1.4rem] transition-all duration-300 hover:shadow-xl hover:z-50">
                <dl className="bg-[rgba(33,150,243,0.618)]">
                  <dt className="mb-4">
                    <h4 className="text-xl">·&nbsp;关于&nbsp;·</h4>
                  </dt>
                  <dd className="mb-2">
                    <p>
                      🙋‍♂️ 赤琦：赤红色的美玉
                      <br />✨ RedBlue：据赤红，琦蓝而译
                    </p>
                  </dd>
                  <dd className="mb-2">
                    <p>👨‍💻 Location：红河</p>
                  </dd>
                  <dd className="mb-2">
                    <p>🎓 专业：物联网工程</p>
                  </dd>
                  <dd className="mb-2">
                    <p>
                      ⚛️ 简介：来自彩云之南的 95
                      后男孩，偏执的完美主义者，体现在方方面面。
                      <br />
                      爱科技、爱搞机、爱摄影、爱一切美好的事物，追求源于热爱。
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 编码统计部分 */}
        <section className="max-w-[1024px] mx-auto px-4 mb-12">
          <h4 className="text-center text-xl mb-6">·&nbsp;编码统计&nbsp;·</h4>
          <div className="overflow-hidden">
            <object
              title="编码统计"
              type="image/svg+xml"
              data="https://wakatime.com/share/@redblue/31eeb3ce-ba04-46d4-be43-9c09edf88c5c.svg"
              className="w-full"
            />
          </div>
        </section>
      </div>
    </>
  );
}
