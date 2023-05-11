import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {

  const { data, loading, error } = useFetch("http://localhost:8000/api/hotels/countByType");
  const images = [
     "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8SG90ZWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    ,"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    ,"https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVzb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
    ,"https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlsbGFzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
  ];

  return (
    <div className="pList">
      {loading ? (
        "Loading Please wait"
      ):(
        <>
        {data && 
          images.map((img, i) => (
            <div className="pListItem" key={i}>
              <img
                src={img}
                alt=""
                className="pListImg"
              />
              <div className="pListTitles">
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
              </div>
            </div>
        ))}
      </>
      )}
    </div>
  );
};

export default PropertyList;