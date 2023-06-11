
//fetch
//axios
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const [list , setlist] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:8080/fetch/list')
    .then((response) => response.json())
    .then((data) => setlist(data));
    
  }
  useEffect(() => { fetchData() }, []);



  const onSubmitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    fetch('http://localhost:8080/fetch/dataup', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
    }),
  }).then(() => fetchData());
    
  }

  const editHandler = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const title = e.target.title.value;
    const content = e.target.content.value;
    fetch('http://localhost:8080/fetch/'+id+'/edit' , {
      method : 'PUT' ,
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
        title,
        content,
      }),

    }).then(() => fetchData());
  }

  const deletHandler = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    axios.delete('http://localhost:8080/'+id).then(() => fetchData());
  
  }

    return (
    <div className="App">
      <h1>FetchDemo</h1>
      <form onSubmit={onSubmitHandler}>
        <input name="title"/>title
        <input name="content"/>content
        <button>전송</button>
      
      </form>
      {list.map((board)=>(
        <div key={board.id}>
          <form onSubmit={editHandler}>
          <div>{board.id}</div>
              <input type="hidden" name="id" value={board.id} />
          <div>{board.title}</div>
              <label>Title: <input type="text" name="title" required /></label>
          <div>{board.content}</div>
      		    <label>Content: <input type="text" name="content" required /></label>
            <input type="submit" value="수정"/>
          </form>
          <form onSubmit={deletHandler}>
          <input type="hidden" name="id" value={board.id} />
              <input type="submit" value="삭제" />
            </form>
        </div>
        
      ))}
    </div>
  );
}

export default App;
