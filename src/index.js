import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors=[
    {
        name:'Mark Twain',
        imageUrl:'images/authors/marktwain.jpg',
        imageSource:'Wikimedia Commons',
        books:['The Adventures Of Huckleberry Finn']
    },
    {
        name: 'Joseph Connrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imageSource:'Wikimedia Commons',
        books:['Heart Of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl:'images/authors/jkrowling.jpg',
        imageAttribution: 'Daniel Ogren',
        imageSource:'Wikimedia Commons',
        books:['Harry Potter and The Sorcerers Stone']
    },
    {
        name:'Stephen King',
        imageUrl:'images/authors/stephenking.jpg',
        imageAttribution:'Pinguino',
        imageSource: 'Wikimedia Commons',
        books:['The Shining', "IT"]
    },
    {
        name:'Charles Dickens',
        imageUrl:'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books:['David Copperfield', 'A Tale Of Two Cities']
    },
    {
        name:'William Shakespeare',
        imageUrl:'images/authors/williamshakespeare.jpg',
        imageSource:'Wikimedia Commons',
        books: ['Hamlet','Macbeth','Romeo and Juliet']
    }
];
function getTurnData(authors)
{
    const allBooks= authors.reduce(function(p,c,i){
        return p.concat(c.books);
    },[]);
    const fourRandomBooks=shuffle(allBooks).slice(0,4);
    const answer=sample(fourRandomBooks);

    return {
        books:fourRandomBooks,
            author: authors.find((author) =>
                author.books.some((title)=>
                    title===answer))
    }
}

const state={
    turnData: getTurnData(authors),
    highlight:''
}

function App () {
    return <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
}
function onAnswerSelected(answer) {
    const isCorrect=state.turnData.author.books.some((book)=>book===answer);
    state.highlight= isCorrect? 'correct':'wrong';
    render();
}
function AuthorWrpper(){
    return <AddAuthorForm onAddAuthor={console.log}/>;
}
function render(){
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App}/>
            <Route path="/add" component={AuthorWrpper}/>
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();
serviceWorker.unregister();
