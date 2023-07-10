import React, { useEffect, useState } from "react";
import NewsCard from "../components/newsCard";
import mockData from "../MOCK_DATA.json";

export default function Home() {
	const [data, setData] = useState(mockData);
	const [modalShow, setModalShow] = useState(false);
	const [modalID, setModalID] = useState(0);
	const [modalInfo, setModalInfo] = useState({});
	const [select, setSelect] = useState([]);

	useEffect(() => {
		const modal = document.querySelector("#news-modal");
		console.log("MODAL SHOW:", modalShow);
		if (modalShow) {
			console.log("MODAL SHOW:", modalShow);
			let temp = data.find((data) => {
				return data.id == modalID;
			});
			setModalInfo(temp);
			modal?.showModal();
		} else {
			setModalInfo({});
			setModalID(0);
			modal?.close();
		}
	}, [modalShow]);

	function checkAll(isChecked) {
		var checkboxes = document.querySelectorAll('input[type="checkbox"]');
		if (isChecked) {
			for (var checkbox of checkboxes) {
				checkbox.checked = true;
			}
			let temp = [];
			data.forEach((data) => {
				temp.push(data.id);
			});
			setSelect(temp);
		} else {
			for (var checkbox of checkboxes) {
				checkbox.checked = false;
			}
			setSelect([]);
		}
	}

	function deleteSelected() {
		if (select.length > 0) {
			let temp = data.filter((data) => {
				return !select.some((id) => id == data.id);
			});
			console.log("selec tis;:", select);
			console.log("TEMP IS:", temp);
			setSelect([]);
			setData(temp);
			checkAll(false);
		}
	}

	return (
		<main>
			{modalShow ? (
				<dialog id="news-modal">
					<div className="modal-top-container">
						<span className="title">{modalInfo?.title}</span>
						<button className="exit-button" onClick={() => setModalShow(false)}>
							✖
						</button>
					</div>
					<span className="details">
						{modalInfo?.author} | {modalInfo?.date}
					</span>
					<div className="content">
						<span>{modalInfo?.content}</span>
					</div>
					<div className="modal-button-container">
						<button className="publish">Publish</button>
						<button className="delete">Delete</button>
					</div>
				</dialog>
			) : (
				<></>
			)}

			<h1>News Articles</h1>
			<div className="top-container">
				<div className="input-container">
					<input
						type="checkbox"
						onChange={(e) => checkAll(e.target.checked)}
					></input>
					<button className="publish">Publish</button>
					<button className="delete" onClick={deleteSelected}>
						Delete
					</button>
				</div>
				<input
					className="search-input"
					type="search"
					placeholder="Search ..."
				></input>
			</div>

			<div className="main-news-container">
				{data.map((data) => (
					<NewsCard
						key={data.id}
						id={data.id}
						author={data.author}
						title={data.title}
						content={data.content}
						date={data.date}
						setModalShow={setModalShow}
						setModalID={setModalID}
						select={select}
						setSelect={setSelect}
					></NewsCard>
				))}
			</div>
		</main>
	);
}
