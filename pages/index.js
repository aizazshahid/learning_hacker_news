import React from 'react';
import Error from 'next/error';
import Layout from '../components/layout';
import StoryList from '../components/story_list';
import Link from 'next/link';


class Index extends React.Component {

    static async getInitialProps({ req, res, query }) {

        let stories, page;

        try {
            page = Number(query.page) || 1;
            const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
            stories = await response.json();
        } catch(err) {
            console.log(err);
            stories = [];
        }
        // const status_code = response.status;

        return { stories, page };

    }

    componentDidMount() {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(registration => {
              console.log("service worker registration successful", registration);
            })
            .catch(err => {
              console.warn("service worker registration failed", err.message);
            });
        }
      }

    render() {
        const { stories, page } = this.props;

        if( stories.length === 0 ) {
            return <Error statusCode={503} />;
        }

        return (
            <Layout title="Hacker News" desc="A cloned Hacker news app made with Next.js" backButton={page > 1}>
                <StoryList stories={stories} />

                <footer>
                    {page > 1 && 
                        <React.Fragment>
                            <Link href="/">
                                <a>Go to home</a>
                            </Link> 
                            &nbsp; | &nbsp;
                        </React.Fragment>}
                    
                    
                    <Link href={`/?page=${page + 1}`}>
                        <a>Next page ({page+1})</a>
                    </Link>
                </footer>

                <style jsx>{`
                    footer {
                        padding: 1em;
                    }
                    footer a {
                        font-weight: bold;
                        color: black;
                        text-decoration: none;
                    }
                    footer a:hover {
                        color: #6600ff;
                    }
                `}</style>
            </Layout>
        )
    }

}

export default Index;