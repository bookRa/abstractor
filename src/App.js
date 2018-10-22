import React, { Component } from 'react';
import { apiClass } from "./api/functions.js"
// import logo from './logo.svg';
import './App.css';
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

      </div>
    );
  }
}
class MainContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      abst_input: "",
      colorizedText: undefined,
      topicLayout: [
        { description: "Topic 1: Applications: {time_series, patient, human, medical}", percentage: undefined },
        { description: "Topic 2: NN Architecture: {layer, deep_learning, node, ensemble}", percentage: undefined },
        { description: "Topic 3: Optimizatin: {non_convex, gradient_descent, mini_batch}", percentage: undefined },
        { description: "Topic 4: Estimation: {ranking, confidence_interval, finite_sample}", percentage: undefined },
        { description: "Topic 5: Reinforcement Learning: {reward, policy, regret, reinforcement_learning}", percentage: undefined },
        { description: "Topic 6: ???: {manifold, recurrent, subspace, quantum, molecule}", percentage: undefined }
      ],
      similarDocs: undefined
      // [
      //   { text: 'Hello', title: "SMTHING", link: "#" },
      //   { text: 'Your Friend', title: "SMTHING", link: "#" },
      //   { text: 'Joe Mom', title: "SMTHING", link: "#" },
      //   { text: 'Baby Boy', title: "SMTHING", link: "#" }]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getRandAbst = this.getRandAbst.bind(this)
  }

  getRandAbst() {
    apiClass.getRandom()
      .then(res => {
        console.log("axios returned rand abst")
        console.log(res.data)
        this.setState({ abst_input: res.data })
      }
      )
  }

  handleSubmit() {
    let { topicLayout, abst_input } = this.state;
    apiClass.postAbst(abst_input)
      .then(res => {
        console.log("axios returned")
        console.log(res.data)
        for (let t in topicLayout) {
          let q = res.data.topics.find(e => e[0] == t)
          console.log(q)
          if (q) {
            topicLayout[t]["percentage"] = parseFloat(q[1] * 100).toFixed(2)
          }
          else { topicLayout[t]["percentage"] = 0 }
        }
        this.setState({
          colorizedText: res.data.words,
          topicLayout: topicLayout
        })
        apiClass.getSimilars(abst_input)
          .then(sims => {
            console.log("Similars returned")
            console.log(sims.data)
            let arrayedSims=[]
            for(let doc in sims.data.text){
              console.log("WE'RE STARTING A NEW DOC: "+ doc)
              let newDoc={}
              for(let k in sims.data){
                console.log("THE KEY IS: "+k)
                newDoc[k] = sims.data[k][doc]
              }
              arrayedSims.push(newDoc)
            }
            console.log("Arrayed Sims!")
            console.log(arrayedSims)
            this.setState({
              similarDocs: arrayedSims
            })

          })
      })

  }

  render() {
    let { colorizedText, topicLayout, similarDocs } = this.state
    return (
      <div className="container">

        {/* TOP PART TO ANALYZE GIVEN ABSTRACT */}
        <div className="row">
          <ul className="col-12 list-inline col-md-3 bg-1" id="topicList" >{
            topicLayout.map((t, i) => <li
              className="list-inline-item col-xs d-md-block topic-rel"
              className={"topic_" + i}
              key={"topic" + i}>{t.description}<br />{t.percentage}</li>)
          }</ul>
          <div className="col-md-6 col-12 bg-2">
            {/* {colorizedText} */}
            {colorizedText ? colorizedText.map((word, idx) => {
              return (
                <span key={"colorWord" + idx} className={"topic_" + word[1]}>{word[0]}<span className="colorSpace"> </span></span>)
            }
            ) : <p>Awaiting Abstract Submission</p>}
          </div>
          {/* <ul className="col-12 col-md bg-danger">
            {similarDocs.map((d,i)=><li className="similar-ab" key={"similar"+i}>{d}</li>)}
          </ul> */}
          <div className="list-group col-md-3 col-12 bg-3 pre-scrollable">
            {similarDocs?
             similarDocs.map((d, i) => <SimAbstract key={"similar" + i} abstract={d} />)
            : <p>Awaiting Abstract Submission</p>}
          </div>
        </div>


        {/* ABSTRACT INPUT */}
        <div className="row">
          <p className="bg-warning col-8">Copy & Paste a Machine Learning Abstract here, or...</p>
          <button onClick={this.getRandAbst} className="btn-secondary btn col-4">Random abstract</button>
          <textarea name="abstract"
            id="abstractInput"
            className="col-8"
            rows="10"
            value={this.state.abst_input}
            onChange={(e) => { this.setState({ abst_input: e.target.value }) }}
          ></textarea>
          <button onClick={this.handleSubmit} className="btn btn-info col-4">ANALYZE</button>
        </div>
      </div>
    )
  }
}

function NavBar() {
  return (
    <div className="navbar navbar-light bg-light">
      <a href="#" className="navbar-brand">Abstractor- Topic Modeling Dashboard</a>
    </div>
  )
}


function SimAbstract(props) {
  return (
    <div
      className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{parseFloat(props.abstract.percentage *100).toFixed(2)}% similarity</h5>
        <small> 
        {/* {props.abstract.topics} */}
        {props.abstract.topics.map(t=>{ return(
        <span className={"topic_"+t[0]}>{(t[1]*100).toFixed(2)} </span>) //parseFloat(t[1]).toFixed(2)
        })}
        </small>
      </div>
      <p className="mb-1">{props.abstract.text}</p>
      <small><a href={"https://arxiv.org/abs/"+props.abstract.link}>Full Article</a></small>
    </div>
  )

}


export default App;
