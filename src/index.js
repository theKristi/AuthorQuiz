import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
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
    turnData: getTurnData(authors)
    
}
ReactDOM.render(<AuthorQuiz {...state} />, document.getElementById('root'));

serviceWorker.unregister();
