import React, { useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>{

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews =  async () =>{
    props.setProgress(10);
    const url =
      `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setarticles(parseData.articles)
    settotalResults(parseData.totalResults)
    setloading(false)
       props.setProgress(100);
  }

  useEffect(() =>{
    document.title = `${capitalizeFirstLetter(props.category)}- NewsUpon`;
    updateNews()
  },[])
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=cf448c54f0c64a6786666fbce375794d&pageSize=${props.pageSize}`;
    // setState({loading: true});
    // let data = await fetch(url);
    // let parseData = await data.json();
    // setState({ articles: parseData.articles, 
    //   totalResults: parseData.totalResults,
    //    loading: false});
    
  // const handlePrevClick = async () => {
  //   // let url =
  //   //   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=cf448c54f0c64a6786666fbce375794d&pageSize=${props.pageSize}&page=${state.page - 1}`;
  //   //   setState({loading: true});
  //   //   let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // setState({
  //   //   articles: parseData.articles,
  //   //   page: state.page - 1,
  //   //   loading: false
  //   // })
  //   setpage(page-1)
  //   updateNews();
  // }

//   const handleNextClick = async () => {
//     // if (!(state.page + 1 > Math.ceil(state.totalResults/props.pageSize))){
      
//     // }
//     // let url =
//     //   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=cf448c54f0c64a6786666fbce375794d&pageSize=${props.pageSize}&page=${state.page + 1}`;
//     //   setState({loading: true});
//     //   let data = await fetch(url);
//     // let parseData = await data.json();
//     // setState({
//     //   articles: parseData.articles,
//     //   page: state.page + 1,
//     //   loading: false
//     // })
//     setpage(page+1)
//     updateNews();
// }
// fetchMoreData = async() => {
//   setState({page: state.page + 1})
//   const url =
//   `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a8ffacca236446ad837993cffd12e954&page=${state.page}&pageSize=${props.pageSize}`;
// setState({loading: true});
// let data = await fetch(url);
// let parseData = await data.json()
// setState({ articles: state.articles.concat(parseData.articles), 
//   totalResults: parseData.totalResults,
//    loading: false, })
// };

const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    setarticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)
};

    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>NewsUpon - Top {capitalizeFirstLetter(props.category)} HeadLine</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length != totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {/* {!state.loading && state.articles.map((element) => { */}
            {articles.map((element, index) => {
            return <div className="col-md-4" key={`${element.url}-${index}`}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}  author={element.author} date={element.publishedAt} source = {element.source.name}
                />
              </div>
          })}
        </div>
        </div> 
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={state.page + 1 > Math.ceil(state.totalResults/props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
  
News.defaultProps = {
  pageSize: 10,
  category: 'general',
  country: 'in',
}

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string
}
export default News;
