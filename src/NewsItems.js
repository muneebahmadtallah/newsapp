import React from 'react'

const NewsItems = (props) =>{
      
        let {title, description, urlToImage, newsUrl, source, author, date} = props;
    return (
        <div className='col-xs-12 col-sm-6 col-md-4 my-4'>
          
            <div  className="card" >

               <div style={{display:"flex", position:"absolute", 
               justifyContent:"flex-end", right:"0"}}>
                <span className='badge rounded-pill bg-danger'>
    {source}  </span></div>
  <img src={urlToImage}   className="card-img-top" style={{maxWidth :"100%", height:"100%"}} alt="News"/>
  <div  className="card-body">
    <h5  className="card-title">{title}</h5>
  
    <p  className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank"  className="btn btn-dark">Go somewhere</a>
  </div>
</div>
        </div>
    )
  }


export default NewsItems