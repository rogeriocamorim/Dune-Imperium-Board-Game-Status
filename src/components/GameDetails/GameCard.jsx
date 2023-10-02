import React, {useState} from 'react';
import {
    TextField,
    Button,
    Modal,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell, TableBody, Paper
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import {fetchGameDetails} from "../../requests/api";

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

function getDuration(startDateString, endDateString) {
    // Convert the date strings into Date objects
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    // Difference in milliseconds
    const diff = endDate - startDate;

    // Convert difference into hours, minutes, and seconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours} hours ${mins} minutes ${secs} seconds`;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function GameCard({ game }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        fetchGameDetails(game.id).then((gameDetails) => {
            setGameDetails(gameDetails);
            setOpen(true);
        });
    }
    const handleClose = () => setOpen(false);

    const [gameDetails, setGameDetails] = useState(null);

    function ChildModal({itemList, type}) {
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        const displayField = type === "vp" ? "itemName" : "cardName";

        return (
            <React.Fragment>
                <Button onClick={handleOpen}>Show</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style, width: 200 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                            {type === "vp" ? "Victory Points" : "Cards in deck"}
                        </Typography>
                        <p id="child-modal-description">
                            {itemList.map(item => (
                                <Typography key={item.id} sx={{ color: 'error.main' }} variant="body1">
                                    {item[displayField]}
                                </Typography>
                            ))}
                        </p>
                        <Button onClick={handleClose}>Close window</Button>
                    </Box>
                </Modal>
            </React.Fragment>
        );
    }

    return (
        <div className="game-card" key={game.id}>
            <div className="game-header">
                <p>Game date: {formatDate(game.gameStartTimestamp)}</p>
                <Button variant="contained"
                        color="primary"
                        className="game-details-button"
                        style={{backgroundColor: "#ff8906",}}
                        onClick={handleOpen}
                        startIcon={<SearchIcon/>}
                >
                    Details
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                            Game Details
                        </Typography>
                        {gameDetails && (
                            <div>
                                {/* Basic Game Details */}
                                <Typography sx={{ color: 'primary.main' }}><strong>Game Start Time:</strong> {formatDate(game.gameStartTimestamp)}</Typography>
                                <Typography sx={{ color: 'primary.main' }}><strong>Game End Time:</strong> {formatDate(game.dateOfGameInsertion)}</Typography>
                                <Typography sx={{ color: 'primary.main' }}><strong>Duration:</strong> {getDuration(game.gameStartTimestamp, game.dateOfGameInsertion)}</Typography>

                                {/* Game Settings */}
                                <Typography sx={{ color: 'primary.main' }}><strong>Rise of Ix:</strong> {gameDetails.riseOfIx ? "Yes" : "No"}</Typography>
                                <Typography sx={{ color: 'primary.main' }}><strong>Immortality:</strong> {gameDetails.immortality ? "Yes" : "No"}</Typography>
                                <Typography sx={{ color: 'primary.main' }}><strong>Red Go First:</strong> {gameDetails.redGoFirst ? "Yes" : "No"}</Typography>
                                <Typography sx={{ color: 'primary.main' }}><strong>Number of Rounds:</strong> {gameDetails.nrounds}</Typography>
                                <Typography sx={{ color: 'primary.main' }}>
                                    <strong>Leaders Not Picked:</strong>
                                    {gameDetails && gameDetails.leadersNotPicked && gameDetails.leadersNotPicked.length > 0
                                        ? gameDetails.leadersNotPicked.map(leader => leader.leaderName).join(', ')
                                        : "No data"}
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Player Steam Name</TableCell>
                                                <TableCell align="right">Placement</TableCell>
                                                <TableCell align="right">VP</TableCell>
                                                <TableCell align="right">Spice</TableCell>
                                                <TableCell align="right">Solari</TableCell>
                                                <TableCell align="right">Water</TableCell>
                                                <TableCell align="right">Leader</TableCell>
                                                <TableCell align="right">Cards</TableCell>
                                                <TableCell align="right">VPs</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {gameDetails.players.map((player) => (
                                                <TableRow
                                                    key={player.steamName}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {player.steamName}
                                                    </TableCell>
                                                    <TableCell align="right">{player.placement}</TableCell>
                                                    <TableCell align="right">{player.vp}</TableCell>
                                                    <TableCell align="right">{player.spice}</TableCell>
                                                    <TableCell align="right">{player.solari}</TableCell>
                                                    <TableCell align="right">{player.water}</TableCell>
                                                    <TableCell align="right">{player.leader}</TableCell>
                                                    <TableCell align="right">
                                                        {player.cardsList && player.cardsList.length >0
                                                            ? <ChildModal itemList={player.cardsList} type="card"/>
                                                            : "No data"
                                                        }
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.vpsList && player.vpsList.length >0
                                                            ? <ChildModal itemList={player.vpsList} type="vp"/>
                                                            : "No data"
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )}
                    </Box>
                </Modal>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Leader</th>
                    <th>Placement</th>
                </tr>
                </thead>
                <tbody>
                {game.players.map((player) => (
                    <tr key={player.id}>
                        <td>{player.steamName}</td>
                        <td>{player.leader}</td>
                        <td>{player.placement}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
