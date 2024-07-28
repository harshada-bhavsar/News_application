import React from "react";

const NewsItem = (props) =>{
    let { title, description ,imageUrl, newsUrl, author , date, source} = props;
    
    const defaultImage = "https://about.fb.com/wp-content/uploads/2024/02/Facebook-News-Update_US_AU_Header.jpg?fit=1920%2C1080";

    const googleNewsImage = "https://chromeunboxed.com/wp-content/uploads/2021/09/Google-News-Feature.jpg";
    const dnaImage = "https://cdn.dnaindia.com/images/2018/DNA-1200.png";
    const ndvtImage = "https://i.ytimg.com/vi/sr2Ry9JVDtU/sddefault.jpg?v=65bce0fb"
    
    let imageToShow = imageUrl;
    if (!imageUrl){
      switch(source){
        case "Google News": 
        imageToShow = googleNewsImage;
        break;
        case "DNA News": 
        imageToShow = dnaImage;
        break;
        case "NDVT News": 
        imageToShow = ndvtImage;
        break;
        default:
          imageToShow = defaultImage;
          break;
      }
    }
    
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display: 'flex' , justifyContent:'flex-end', position:'absolute', right:'0'}}>
        <span className="badge rounded-pill bg-danger">{source}<span className="visually-hidden">unread messages</span></span>
  </div>
          <img src={imageToShow} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem
