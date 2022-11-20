import Head from "next/head";

interface ISEOProps {
  title: string,
  description: string
}

const SEO = ({ title, description }: ISEOProps) => {
    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
      </Head>
    )
}

export default SEO