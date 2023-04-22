import { Input, List, Avatar, Card } from 'antd';
import { useState, useContext } from 'react';
import { ReviewContext, ReviewContextUpdater } from "../pages/NewReview"
import "./SpotifySearch.css"

export default function SpotifySearch(props : any) {

    let states : any = useContext(ReviewContext) 
    let reviewData = states.reviewData
    let setReviewData = states.setReviewData

    const [searchList, setSearchList] = useState([])

    function searchAlbums(query : string) : void {
        if (query == "") {
            setSearchList([])
            return
        } 

        let searchUrl = new URL("https://api.spotify.com/v1/search")
        searchUrl.searchParams.append("q", query)
        searchUrl.searchParams.append("type", "album")
        searchUrl.searchParams.append("limit", String(5))
        let accessToken = localStorage.getItem("Authorization")

        fetch(searchUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`     
            }
        })
        .then(response => {
            if(!response.ok){
              throw Error("Response Not Ok")
            }
              return response.json();
            })
        .then((res) => {
            let results : any = []
            let searchResults = res.albums.items
            

            searchResults.forEach((album : any) => {
                
                results.push(      
                    <List.Item key={album.uri} onClick={() => {
                        setReviewData(album)
                        console.log("review data !!! ", setReviewData)
                    }}>
                      <List.Item.Meta
                        avatar={<Avatar shape='square' size='large' src={album.images[0].url} />}
                        title={album.name}
                        description={album.artists[0].name}
                      />
                    </List.Item>);
            });

            setSearchList(results)
            
        
        })
        .catch((err) => {console.error(err)})
        
        
        

    }


    return (
      <div className="spotify-search">
          <div style={{display: (props.hidden) ? "none" : "block"}}>
            <Input
              onChange={(value) => {
                searchAlbums(value.target.value);
              }}
            ></Input>
            {searchList.length == 0 ? null : (
              <Card>
                <List itemLayout="horizontal">{searchList}</List>
              </Card>
            )}
          </div>
      </div>
    );
}