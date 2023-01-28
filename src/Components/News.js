import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title=`${capitalizeFirstLetter(props.category)}-NewMonkey`

  const updateNews=async ()=>{
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    await fetch(url).then((res) => res.json())
    .then((json1) => {
      setArticles( json1.articles)
      setTotalResults(json1.totalResults)
      setLoading(false)
    });
    props.setProgress(100)
  }
  useEffect(() => {
    updateNews()
  },[])
  

  // const handlePrevClick=async ()=>{
  //   await setPage(page-1)
  //   updateNews()
  // }
  //  const handleNextClick = async () =>{
  //   await setPage(page+1)
  //   updateNews()
  // }

  const fetchMoreData =async () => {
    setPage(page+1)
    setTimeout(async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    await fetch(url).then((res) => res.json())
    .then((json1) => {
        setArticles(articles.concat(json1.articles))
        setTotalResults(json1.totalResults)
    });
    }, 1500);
  };

 
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0,60):""} description={element.description?element.description.slice(0,88):""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        
        <Button disabled={this.state.page===1} variant="dark" onClick={this.handlePrevClick}>&larr; Prev</Button>
        <Button disabled={this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)} variant="dark" onClick={this.handleNextClick}>Next &rarr;</Button>
        
        
        </div> */}
      </div>
    )
  
}

export default News

News.defaultProps = {
  country:'in',
  pageSize:15,
  category:'general'
}
News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}