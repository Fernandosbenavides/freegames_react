import {
    FaGamepad,
    FaShieldAlt,
    FaChess,
    FaSpaceShuttle,
    FaUserPlus,
} from "react-icons/fa";
import {
    GiAura,
    GiCrossedSwords,
    GiPistolGun,
    GiFairyWand,
    GiCardRandom,
    GiBoxingGlove,
    GiSoccerBall,
} from "react-icons/gi";
import { AiOutlineAim } from "react-icons/ai";
import { IoCarSport } from "react-icons/io5";

const GameCards = ({ games }) => {
    const genreIcons = {
        "MMORPG": <GiCrossedSwords />,
        "ARPG": <GiCrossedSwords />,
        "MMOARPG": <GiCrossedSwords />,
        "Shooter": <AiOutlineAim />,
        "MOBA": <FaShieldAlt />,
        "Anime": <GiAura />,
        "Battle Royale": <GiPistolGun />,
        "Strategy": <FaChess />,
        "Fantasy": <GiFairyWand />,
        "Sci-Fi": <FaSpaceShuttle />,
        "Card Games": <GiCardRandom />,
        "Racing": <IoCarSport />,
        "Fighting": <GiBoxingGlove />,
        "Social": <FaUserPlus />,
        "Sports": <GiSoccerBall />,
    };

    return (
        <div className="row">
            {games.map((game) => (
                <div className="col-md-4 mb-4" key={game.id}>
                    <div className="card h-100">
                        <img src={game.thumbnail} className="card-img-top" alt={game.title} />
                        <div className="card-body">
                            <h5 className="card-title">{game.title}</h5>
                            <p className="card-text">{game.short_description}</p>
                            <p className="card-text">
                                <strong>
                                    <FaGamepad /> <span></span>Plataformas:
                                </strong>{" "}
                                {game.platform}
                            </p>
                            <p className="card-text">
                                <strong>
                                    {" "}
                                    {genreIcons[game.genre]} <span></span> Género:
                                </strong>{" "}
                                {game.genre}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameCards;
