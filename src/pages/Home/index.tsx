import './home.scss';
import { v4 as uuidV4 } from 'uuid';
import { useState } from 'react';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const [roomId, setRoomId] = useState("");
	const [username, setUsername] = useState("");

	const createNewRoom = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		const id = uuidV4();
		setRoomId(id);
		toast.success("Created a new room");
	}

	const joinRoom = () => {
		if (!roomId || !username) {
			toast.error("Room ID and username is required");
			return;
		}
		navigate(`/editor/${roomId}`, {
			state: {
				username,
			}
		})
	}

	const handleInputEnter = (e: { code: string; }) => {
		if (e.code === "Enter") {
			joinRoom();
		}
	}

	return (
		<div className="homepage-wrapper">
			<div className="form-wrapper">
				<h4 className="main-label">Paste Invitation ROOM ID</h4>
				<div className="input-group">
					<input type="text" className="input-box" placeholder="ROOM ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} onKeyUp={handleInputEnter} />
					<input type="text" className="input-box" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} onKeyUp={handleInputEnter} />
					<button className="btn btn-join" onClick={joinRoom}>Join</button>
					<span className="create-info">if you don't have any invite then create &nbsp;
						<button onClick={createNewRoom} className="create-new-btn">new room</button>
					</span>
				</div>
			</div>
		</div>
	)
}

export default Home