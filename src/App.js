import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import './Navbar.css'
// import './MainContent.css'

class App extends Component {
  // constructor(){
  //   this.state = {

  //   }
  // }

  render() {
    return (
      <div className="App">
        <NavBar className="NavBar" />
        <MainContent className="MainContent" />
      
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. LIKETHISMA?
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}
class MainContent extends Component{
  // constructor(){
  //   this.state={
  //     colorizedText: "Now I'm going to sing",
  //     topicLayout: [1, 3, 4, 5, 6],
  //     similarDocs: ['Hello', 'Your Friend', 'Baby Boy']
  //   }
  // }
  state={
    colorizedText: "Now I'm going to sing",
    topicLayout: [1, 3, 4, 5, 6],
    similarDocs: ['Hello', 'Your Friend', 'Baby Boy']
  }
  render(){
    let {colorizedText, topicLayout, similarDocs} = this.state
    return(
      <div className="container">
        <div className="row">
          <ul className="col-12 list-inline col-md bg-primary" id="topicList" >{
            topicLayout.map((t, i)=><li 
            className="list-inline-item col-xs d-md-block topic-rel bg-secondary"
             key={"topic"+i}>{t}</li>)
          }</ul>
          <div className="col-md col-12 bg-success">{colorizedText}</div>
          <ul className="col-12 col-md bg-danger">
            {similarDocs.map((d,i)=><li className="similar-ab" key={"similar"+i}>{d}</li>)}
          </ul>
        </div>
        <div className="row">
          <p className="bg-warning col-8">Copy & Paste a Machine Learning Abstract here, or...</p>
          <button className="btn col-4">Random abstract</button>
          {/* <input type="text" placeholder="place your abstract here"/> */}
          <textarea name="abstract" id="abstractInput" className="col-8" rows="10"></textarea>
          <button className="btn col-4">ANALYZE</button>
        </div>
      </div>

      // <React.Fragment>
      //   <div className="colorizedText">{colorizedText}</div>
      //   {/* <div className="topicLayout"> */}
      //   {topicLayout.map(t=>{
      //     <div> Topic {t}</div>
      //   })}
      //   {/* </div> */}
      //   <div className="similarDocs">
      //     <ul>
      //       {similarDocs.map((currDoc, indx)=> {
      //         <li key={indx}>currDoc</li>
      //       }
      //       )}
      //     </ul>
      //   </div>
      // </React.Fragment>
    )
  }
}

function NavBar(){
  return(
    <div className="NavBar">
    <h1>Hello ma world. Omar here, ready to kick ad$</h1>
    </div>
  )
}

export default App;
