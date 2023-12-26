import Head from "next/head"
export default function Header(promps){
    return(
        <>
        <Head>
            <link rel="icon" type="image/x-icon" href="img_1.png"/>
            <title>{promps.title}</title>
        </Head>
         
        </>
    )
}