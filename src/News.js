import React,{useState, useEffect} from 'react';
import Loading from './Loading';
import NewsItems from './NewsItems';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{
      
     const [articles, setArticles] = useState([])
     const [totalResults, setTotalResults] = useState(0)
     const [page, setPage] = useState(1)
     const [loading, setLoading] = useState(true)
     const capitalizeFirstLetter =(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
      document.title = `${capitalizeFirstLetter(props.category)} - NewsApp`;
  
  const update = async ()=> {
      props.setProgress(10);
     let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parseData = await data.json()
      props.setProgress(70);
      setArticles(parseData.articles);
      setTotalResults(parseData.totalResults);
      setLoading(false);
      props.setProgress(100);
      
  }
  useEffect(() => {
    update();
    // the below comment is used to remove warning in console for specific line 
    // eslint-disable-next-line
  }, [])
  
   

//   const handlePreClick = async () => {
//      setPage(page + 1);
//   }
//   const handleNextClick = async () => {   
//      setPage(page - 1);
//     }

const fetchMoreData = async () => {
   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1f239d8942694ea288ff52d01cfbe07c&page=${page + 1}&pageSize=${props.pageSize}`;
  setPage(page + 1);
      let data = await fetch(url);
      let parseData = await data.json()
      setArticles(articles.concat(parseData.articles));
      setTotalResults(parseData.totalResults);
      
  
  };
    return (
      <>
          <h1 className='text-center my-4 text-danger'>Top {capitalizeFirstLetter(props.category)} Headlines</h1>
         
          {/* <div className="container d-flex justify-content-between my-4">
              <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePreClick}> &larr; Previous</button>
              <button disabled={page + 1 > Math.ceil(totalResults/20)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
          </div> */}

          {loading && <Loading/>}
          {/* ifloading is true then above component will display */}

            {/* below component is used for infinite scroll.. firstly we have to install their packages 
            annd then we will import infinite scroll component */}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading/>} >

          <div className="container">
          <div className='row justify-content-md-center'>
          {/* {!loading && articles.map((element)=> */}
          {/* // if loading is not true the contetn will display */}
          {articles.map((element)=>
          { return <NewsItems 
            key={element.url} 
            source={element.source.name?element.source.name.slice(0, 50):"Unknown"}
            title={element.title?element.title.slice(0, 55):"There is no Title for this News"} 
            description={element.description?element.description.slice(0, 90):"There is no any description for this news There is no any description for this news"} 
            author ={element.author?element.author:"Unknown"} 
            date={element.publishedAt?element.publishedAt:"Not Mentioned"}
            urlToImage={element.urlToImage?element.urlToImage:"https://media.istockphoto.com/photos/abstract-digital-news-concept-picture-id1290904409?s=612x612"}
            newsUrl={element.url}/>
             })}
          </div>
          </div>
          
          
        </InfiniteScroll>
          
         
      </>
    )
  }

News.defaultProps = {
        country : 'us',
        pageSize : 20,
        category : 'general'

      }  
      News.propTypes ={
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category : PropTypes.string
      }

     export default News; 