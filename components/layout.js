import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = url => {
    NProgress.start();
}

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = ({ children, title, desc, backButton }) => (
    <div>
        
        <Head>
            <title>{ title }</title>
            <meta name="description" content={desc} />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" />
        </Head>

        <div className="container">

            <nav>
                {backButton && <span className="back-button" onClick={() => Router.back()}>&#x2b05;</span>}
                <Link href="/">
                    <a className="main-title">Hacker News</a>
                </Link>
            </nav>
            
            {children}
        </div>

        <style jsx>{`
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #f6f6ef;
        }
        nav {
            background: #f60;
            padding: 1em;
        }
        nav > * {
            display: inline-block;
            color: black;
        }
        nav a {
            text-decoration: none;
        }
        nav .main-title {
            font-weight: bold;
        }
        nav .back-button {
            font-size: 0.9rem;
            padding-right: 1em;
            cursor: pointer;
        }
        `}</style>
        <style jsx global>{`
            body {
                background: white;
                font-family: Verdana, Geneva, sans-serif;
              }
        `}</style>
    </div>
);

export default Layout;