import React, { Component } from 'react';
import './App.css';

var questions = [
  {
    id:"1",
    title:"Question 1",
    type:"boolean",
    correctAnswer:"true",
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    
  },
  {
    id:"2",
    title:"Question 2",
    type:"text",
    correctAnswer:"test",
    text:"Sagittis justo dictumst dapibus tempor scelerisque, ligula pellentesque per in lectus odio, nulla blandit turpis imperdiet, nulla sagittis, vulputate et porttitor tempus rutrum auctor dui. Hendrerit arcu vel, sed vivamus ut nulla, aenean mauris per odio magna, mi nunc auctor justo duis sed phasellus, dolor eu amet adipiscing vivamus. Lectus fusce, sapien sed integer ullamcorper ultrices duis porta, ultricies quis, volutpat nascetur amet, wisi commodo nunc. ",
    
  },
  {
    id:"3",
    title:"Question 3",
    type:"multi-choice",
    correctAnswer:"b",
    text:"Ridiculus eget per maecenas, etiam lectus tempus eu eget, augue vitae, sapien id mollis ut lectus sit, tincidunt nisl quidem sed dolor pellentesque. In elit, id phasellus in accumsan, amet in aenean, maecenas eros nec nec sollicitudin pretium aliquam. Ac arcu semper at vel, orci voluptas justo ligula erat porttitor mauris, urna mattis nec justo bibendum aliquam. Dignissim eros quisque suscipit donec ipsum, auctor sollicitudin arcu.",
    options :[{code:"a", text:"Option A"}, {code:"b", text:"Option B"}, {code:"c", text:"Option C"}]
  }
];

class Header extends Component {
  render() {
    return ""
  };
}


class QuestionNavigationContainer extends Component {

  checkAnswer() {
    return (questions[this.props.questionIndex].answer !== undefined);
  }
  render() {

    var leftBound = false;
    var rightBound = false;

    if (this.props.questionIndex === 0 ) {
      leftBound  = true;
    } else if ( this.props.questionIndex === questions.length ) {
      rightBound = true;
    }
    
    return <div className="question-navigation-container" > 
              <i onClick={() =>{ !leftBound  ? this.props.nav(-1): alert("cannot go back") }}  className={`fa fa-chevron-circle-left navigation-button ${leftBound  ? 'disabled':''} `}></i>
              <i onClick={() =>{ !rightBound && this.checkAnswer() ? this.props.nav(1): alert("cannot go forward") }}   className={`fa fa-chevron-circle-right navigation-button ${rightBound  ? 'disabled':''} `}></i>
             
          </div>
  }
}

class Result extends Component {

  checkAnswer() {
    var s = {}
    if (this.props.question.correctAnswer === this.props.question.answer) {
        s = {color:'green'}
        return <i class="fa fa-check-circle " style={s}></i>
    } else {
        s = {color:'red'}
        return <i class="fa fa-times-circle" style={s}></i>
    }
     
     
  }

  render() {
     return <div className="result">
          <div className="result-cell dw-100" >{this.props.question.title}:</div> 
          <div className="result-cell">{this.props.question.answer}</div>
          <div className="result-cell right-align">{this.checkAnswer()} </div>
       </div>
  }
}

class ResultPage extends Component {

  getScore() {

    var correctAnswers = 0;
    var score = 0;
    questions.forEach(q=> {
      if(q.answer === q.correctAnswer) {
        correctAnswers ++;
      }
    })

    score = (correctAnswers / questions.length) * 100;
    return <span>{correctAnswers} of {questions.length}  ({score.toFixed(2)}%)</span>
    
  }

  render() {

    var results = questions.map(q => <Result question={q} />)
    return (<div>
            <div className="result-container">
              {results}
            </div>
            <div  className="result-line" />
            <div className="score">    {  this.getScore()} </div>
    </div>)
  }
}

class QuestionTitle extends Component {
  render() {
    return <div  className="question-title"> {this.props.question.title}
      </div>
  }
}

class QuestionText extends Component {
  render() {
    return <div > {this.props.question.text}
    </div>
  }
}

class AnswerOptionFactory {
  static build(question) {
    console.log(question.type);
    switch (question.type) {
      case 'multi-choice':
          return  <AnswerTypeMultiChoice question={question} />
      case 'text':
          return  <AnswerTypeMultiText question={question} />
      case 'boolean':
          return <AnswerTypeBoolean  question={question} />
      default:
          return ""
    }
  }
}


class AnswerType extends Component {

  setValue = (value) => {
    this.setState({ value: value });
    this.props.question.answer = value;
  }
}
class AnswerTypeMultiChoice extends AnswerType {
  render() {
    var options = this.props.question.options.map(o => {
      return <div className="multi-choice-item">
              <input type="radio"
                     className="tl-radio"
                     name={"q_"+this.props.question.id}
                     onClick={() => this.setValue(o.code)}
                     checked={this.props.question.answer === o.code}
                     value={o.code} /> {o.text}
            </div>
    })
    return <div className="multi-choice-container">
        {options}
    </div>
  } 
}

class AnswerTypeMultiText extends AnswerType {
  render() {
    return <div>
        <textarea 
          value={this.props.question.answer} 
          onChange={(e) => this.setValue(e.target.value)}
          className="form-control"/>
    </div>
  } 
}

class AnswerTypeBoolean extends AnswerType {
  constructor() {
    super()
    this.state = {value:null}
   
  }
  render() {
    return (
      <div className="multi-choice-container" >
        <div className="multi-choice-item" >
            <input type="radio"
                name={"q_"+this.props.question.id}
                className="tl-radio"
                onClick={() => this.setValue("true")}
                checked={this.props.question.answer === "true"}
                value={true} /> True
    
          </div>
          <div className="multi-choice-item" >
            <input type="radio"
                name={"q_"+this.props.question.id}
                className="tl-radio"
                onClick={() => this.setValue("false")}
                checked={this.props.question.answer === "false"}
                value={false} /> False
    
          </div>
        </div>
     );
  } 
}

class AnswerOptionsContainer extends Component {
  render () {
    return <div className="answer-option-container" >
    {AnswerOptionFactory.build(this.props.question)}
    </div>
  }
}

class Breadcrumb extends Component {
  render() {
    return <span className={'bread-crumb ' + this.props.state}><i className="fa fa-circle"></i></span>
  }

}
class BreadCrumbContainer extends Component {
  constructor() {
    super()
    this.state= {currentIndex:0 }
  }
  getEndResult() {
    if(this.props.questionIndex === questions.length) {
      return <i class="fa fa-flag-checkered bread-crumb-end-result answered"></i>
    } else {
      return <i class="fa fa-flag-checkered bread-crumb-end-result waiting"></i>
    }
  }
  render() {
    var breadcrumbs = questions.map( (q,idx) => {
      let status = "waiting";
      if(idx === this.props.questionIndex) {
        status = "current";
      } else if (idx < this.props.questionIndex) {
        status = "visited";
      } else if (q.answer) {
        status = "answered";
      }
      return <Breadcrumb state={status}/>
    }
    );

    

    return <div className="bread-crumb-container"> {breadcrumbs} 
        {this.getEndResult()}
    </div>
  }
}  

class QuestionContainer extends Component {
  constructor(index = 0) {
    super()
    this.state = {index:0}
  }
  navigate = (direction) => {
    var nIdx = this.state.index + direction 
   
    if (nIdx > questions.length) {
      nIdx = questions.length -1;
    } else if (nIdx <= 0) {
      nIdx = 0;
    }
    this.setState({ index: nIdx });
    
   
  }
  getPage(q) {
    if(this.state.index < questions.length) {
      return (<div className="question"> 
        <QuestionText question={q} />
        <AnswerOptionsContainer question={q}/>
      </div>)
     } else {
       return (
        <div className="question"> 
        <ResultPage />
      </div>
       )
     }
  }
  render() {
    let q = questions[this.state.index];
    if(!q ) {
      q = {title:"Results"}
    }
    return <div className="question-container">
     
      <QuestionTitle question={q} />
      <BreadCrumbContainer questionIndex={this.state.index} />
     {this.getPage(q)}
     
     <QuestionNavigationContainer questionIndex={this.state.index} nav={this.navigate}/>
    </div>
  }
}

class Body extends Component {
  render() {
    return <div className="app-body">
              <QuestionContainer />
            </div>
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Body />
       </div>
    );
  }
}

export default App;