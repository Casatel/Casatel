import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {

  const { data, loading, error } = useFetch("http://localhost:8000/api/hotels/countByCity?cities=Mumbai,Hyderabad,Kerala,Bengaluru");

  return (
    <div className="featured">
      {loading ? 
      (
        "Loading please wait"
      ):(
        <>
        <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bXVtYmFpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>MUMBAI</h1>
          <h2>{data[0]}</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1570795876989-bcec725b8e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aHlkZXJhYmFkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>HYDERABAD</h1>
          <h2>{data[1]}</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>KERALA</h1>
          <h2>{data[2]}</h2>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Featured;