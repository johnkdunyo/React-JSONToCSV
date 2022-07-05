import { unparse } from 'papaparse';
import sampledata from './sampleData'
console.log(sampledata)

function App() {



  const exportCSVFile = (headers, items = sampledata, fileTitle) => {

    fileTitle = fileTitle ?? 'Exported';
    
    let csvHeader = unparse({
      fields: [...headers.map(item => item.name)],
      data: [],
    })

    let csvVal = unparse(items, {
      header: false,
      columns: [...headers.map(item => item.key)]
    })

    let csv = csvHeader + csvVal
    
    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
    }
  }






  return (
    <div>
      <nav className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}}>
        <div className="container-fluid px-5">
          <span className="navbar-brand mb-0 h1">JSONToCSV</span>
          <span>Version 0.0.1</span>
        </div>
      </nav>
      
      <div className="main pt-5">
        <div className="container">
        <h4 className="display-6 text-center" >This is supposed to be a package to convert json to csv in react and also provide a link for direct download</h4>

        <div className='mt-5'>
          <button className='btn btn-primary float-end' onClick={()=>exportCSVFile(
            [
              {key:'id', name:'ID'}, {key:'userId', name:'USERID'}, {key:'title', name:'TITLE'}, {key:'body', name:'BODY'}
          ]
          )}>Download CSV</button>
        </div>
      {/* table goes here */}
      <div className="pt-5">
      <table className="table table-hover">
        <thead className="table-success">
          <tr>
            <th scope="col">#</th>
            <th scope="col">UserID</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
          </tr>
        </thead>
        <tbody>
          {sampledata.map(data=>(
            <tr key={data.id}>
            <th scope="row">{data.id}</th>
            <td>{data.userId}</td>
            <td>{data.title}</td>
            <td>{data.body}</td>
          </tr>
          ))}
          
      
        </tbody>
      </table>
      </div>


        </div>

      </div>


      

    </div>
  );
}

export default App;
