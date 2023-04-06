import { Input, List, Avatar, Card } from 'antd';
import { useState } from 'react';

export default function SpotifySearch() {

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
            console.log(res)

            searchResults.forEach((album : any) => {
                results.push(      
                    <List.Item key={album.uri}>
                      <List.Item.Meta
                        avatar={<Avatar shape='square' size='large' src={album.images[0].url} />}
                        title={album.name}
                        description={album.artists.join(', ')}
                      />
                    </List.Item>);
            });

            setSearchList(results)
            console.log(res)
        
        })
        .catch((err) => {console.error(err)})
        
        
        

    }


    return (
      <div>
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
    );
}