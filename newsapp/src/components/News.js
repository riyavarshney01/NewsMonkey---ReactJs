import React, {useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
   const [articles, setArticles] =useState([])
   const [loading, setLoading] = useState(true)
   const [page, setPage] = useState(1)
   const [totalResults, setTotalResults] = useState(0)
   const [scrollLoading, setScrollLoading] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = async () => {
    // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a5bd3995b6247e8917bd103ad1768ef&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2459bf2a710c40e0b6148d8010042e28&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
      props.setProgress(100);

  }
  useEffect(() => {
     document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
     updateNews();
    // eslint-disable-next-line
  },[])

 const fetchMoreData = async ()=> {
  setScrollLoading(true);
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2459bf2a710c40e0b6148d8010042e28&page=${page +1 }&pageSize=${props.pageSizez}`;
  setPage(page + 1)
  let data = await fetch(url);
  let parsedData = await data.json()
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
  setPage(page + 1)

  setScrollLoading(false);
};
    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px',marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={scrollLoading && <Spinner/>}
          
        >
          <div className="container">

        <div className="row">
        {articles?.map((element) =>{
           return  <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description? 
                element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
} ) }
</div>
</div>
</InfiniteScroll>
</>
    )
  }

// News.defaultProps = {
//   country: 'in',
//   pageSize: 8,
//   category: 'general',
  
// }

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
}

export default News
