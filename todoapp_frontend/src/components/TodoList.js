import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import '../index.css';
import {
	MdCheckBox,
	MdCheckBoxOutlineBlank,
	MdEdit,
	MdDelete,
} from 'react-icons/md';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormControl from 'react-bootstrap/FormControl';

export default function TodoList({ todos = [], setTodos }) {
	const [show, setShow] = useState(false);
	const [record, setRecord] = useState(null);

	const handleClose = () => {
		setShow(false);
	};

    const handleDelete = (id) => {
        axios.delete(`/api/todos/${id}/`).then(()=>{
            const newTodos = todos.filter(e =>{return e.id !== id});
            alert("Pomyślnie usunąłeś")
            setTodos(newTodos);
        }).catch(()=>{
            alert("Coś poszło nie tak")
        })
    }

	const handleUpdate = async (id, value) => {
		return axios
			.patch(`api/todos/${id}/`, value)
			.then((res) => {
				const { data } = res;
				const newTodos = todos.map((e) => {
					if (e.id === id) {
						return data;
					}
					return e;
				});
				setTodos(newTodos);
			})
			.catch(() => {
				alert('Coś poszło nie tak');
			});
	};

	const renderListGroupItem = (e) => {
		return (
			<ListGroup.Item
				key={e.id}
				className='d-flex justify-content-between align-items-center p-3'>
				<div className='d-flex justify content-center text-xl items-center'>
					<span
						className='span-item'
						onClick={() => {
							handleUpdate(e.id, { completed: !e.completed });
						}}>
						{e.completed === true ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
					</span>
					<span className="text-sm px-3"> {e.created_at} </span>
					<span> {e.name} </span>
				</div>
				<div className='flex text-xl'>
					<MdEdit
						onClick={() => {
							setRecord(e);
							setShow(true);
						}}
						className='span-item hover:text-orange-400'
					/>
                        <MdDelete className='span-item hover:text-red-700' onClick={() => {handleDelete(e.id)}}/>
				</div>
			</ListGroup.Item>
		);
	};

	const handleChange = (e) => {
		setRecord({
			...record,
			name: e.target.value,
		});
	};

	const handleSaveChanges = async () => {
		await handleUpdate(record.id, { name: record.name });
		handleClose();
	};

    const completedTodos = todos.filter(e => e.completed === true);
    const incompletedTodos = todos.filter(e => e.completed === false);


	return (
		<div>
			
            <div className="mb-2 mt-4">
                Aktualne zadania ({incompletedTodos.length}):
                <ListGroup>{incompletedTodos.map(renderListGroupItem)}</ListGroup>
            </div>
            <div className="mb-2 mt-4">
                Ukończone zadania ({completedTodos.length}):
                <ListGroup>{completedTodos.map(renderListGroupItem)}</ListGroup>
            </div>
			
			<Modal show={show} onHide={handleClose} className="mt-48">
				<Modal.Title className='text-center mt-3 '>Edytuj Todo</Modal.Title>
				<Modal.Body>
					<FormControl
						value={record ? record.name : ''}
						onChange={handleChange}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Anuluj
					</Button>
					<Button variant='primary' onClick={handleSaveChanges}>
						Zapisz
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
