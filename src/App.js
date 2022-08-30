import "./App.scss";
import React, { useEffect, useState } from "react";
import jsonData from "./qs_interview_data.json";

// Questions:
// 1. Load data from local file (path: “https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json”)
// 2. Use the screenshot as an example, implement a generic function for reading any JSON file in that format, then display the top 12 brands based on audience_size. We always want to have 4 items in one row.
// 3. Add a hover state with a dark, semi-transparent overlay and display the ID of the hovered brand.

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    jsonData.data.sort(function (a, b) {
      return b.source_items.audience_size - a.source_items.audience_size;
    });
    setData(jsonData.data)
    console.log(jsonData.data)
  }, []);

  const getColumns = (indexRow) => {
    let result = []
    for (let index = indexRow; index < indexRow + 4; index++) {
      if (index < data.length){
        const element = data[index];
        result.push(element)
      }
    }
    if(result.length > 2) {
      let lastItem = result.splice(1, 1)
      result.push(lastItem[0])
    }
    return result
  }

  return (
    <div className="App">
      <div style={container}>
        <div style={title}>Choose a Conde Nast brand's audience</div>
        {data.map(
          (item, indexRow) =>
            indexRow % 4 === 0 && (
              <div style={rowStyle} key={indexRow}>
                {
                  getColumns(indexRow).map((item, indexCol) => (
                    <div style={colStyle} key={indexCol} >
                        <figure className="img-wrapper">
                          <img key={indexCol} src={item.social_media_pages.picture} alt='online'/>
                          <figcaption>
                            <p>{item.source_items.id}</p>
                          </figcaption>
                        </figure>
                    </div>
                  ))
                }
              </div>
            )
        )}
      </div>
    </div>
  );
}

const container = {
  width:'100%',
  height:'100vh',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column'
}

const title = {
  fontWeight: 'bold',
  color: '#555'
}

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems:'center',
  justifyContent:'center'
}


const colStyle = {
//  padding :10,
//  borderWidth:1,
//  borderColor:'#eee',
//  borderStyle:'solid',
//  margin: 5,
//  borderRadius:8
}

export default App;
