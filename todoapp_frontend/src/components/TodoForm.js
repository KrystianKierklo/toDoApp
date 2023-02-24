import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function TodoForm(todos, setTodos) {
	const [name, setName] = useState('');

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) {
			alert('Coś poszło nie tak');
			return;
		}

		axios
			.post('/api/todos/', {
				name: name,
			})
			.then((res) => {
				setName('');
				const { data } = res;
				setTodos([...todos, data]).catch(() => {
					alert('Coś poszło nie tak');
				});
			});
            window.location.reload();
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup className='mb-4'>
				<FormControl
					placeholder='Nowe zadanie'
					onChange={handleChange}
					value={name}
				/>
				<Button type='submit'>Dodaj</Button>
			</InputGroup>
		</Form>
	);
}
