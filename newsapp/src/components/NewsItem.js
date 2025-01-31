import React from 'react'

const NewsItem = (props) =>{
    let {title, description, imageUrl, newsUrl,author,date,source} = props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "20rem"}}>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }
          }>
       < span className="badge rounded-pill bg-danger" >{source} </span>
       </div>
       
              <img src={!imageUrl?"https://www.hindustantimes.com/ht-img/img/2024/06/17/1600x900/raha_walking_ranbir_alia_1718625048123_1718625065046.jpg":imageUrl}className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-danger">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }



export default NewsItem 