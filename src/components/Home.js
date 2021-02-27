import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './default.css'
import SearchBox from './SearchBox'

const Home = () => {

    const [player, setPlayer] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    //fetching player data through api and storing it in the state.
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://api.npoint.io/d6bd0efc05639084eb17/'
            );
            setPlayer(result.data.playerList)
            // console.log(result.data.playerList)
        };
        fetchData();
    }, [])

    //adding functionality for search function by filtering the player name and team name
    useEffect(() => {
        setFilteredPlayers(
            player.filter(fplayer => {
                return fplayer.PFName.toLowerCase().includes(search.toLocaleLowerCase()) || fplayer.TName.toLocaleLowerCase().includes(search.toLocaleLowerCase());

            })
        )
    }, [search, player])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="cardContainer">
            <div className="searchContainer">
                <h3>Sportz Interactive Project</h3>
                <SearchBox placeholder="Enter Player name ..." handleChange={handleChange} />
            </div>
            <div className="cardList">
                {filteredPlayers.map(item => (
                    <div className="card">
                        <div className="cardImage">
                            <img src={`/player-images/${item.Id}.jpg`} alt={item.PFName + ' image'} />
                        </div>
                        <div className="playerInfo">
                            <h3>Name: {item.PFName}</h3>
                            <h4>Skill: {item.SkillDesc}</h4>
                            <p>Player Value: ${item.Value}M</p>
                            <p>Upcoming Match: {item.UpComingMatchesList[0].CCode} VS {item.UpComingMatchesList[0].VsCCode}</p>
                            <p>Next Match Time: {item.UpComingMatchesList[0].MDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home;
