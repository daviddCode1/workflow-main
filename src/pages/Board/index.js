import { useState, useEffect } from 'react';

import './Board.css';

import Modal from '../../components/Modal';
import AddTask from '../../components/AddTask';
import TaskItem from '../../components/TaskItem';

const Board = () => {
	const [openModal, setOpenModal] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [subTaskCreate, setSubTaskCreate] = useState(false);
	const [taskId, setTaskId] = useState('');
	const handleClick = () => {
		setOpenModal(true);
		setSubTaskCreate(false);
	};

	const handleToggleSubStatus = (subTaskId, status, taskId) => {
		console.log({
			subTaskId,
			status,
			taskId,
		});

		const prevTasks = [...tasks];

		const updatedTasks = changeSubTaskStatus(
			prevTasks,
			taskId,
			subTaskId,
			status
		);

		// also check the status of Task itself
		const updatedWithTaskStatus = updatedTasks.map((task) => {
			if (task.id === taskId) {
				// if one subtask "in-progress" move task to in-progress
				if (task.subTasks.some((subTask) => subTask.status === 'in-progress')) {
					task.status = 'in-progress';
				} else if (
				// if all subtasks "completed" move task to completed
					task.subTasks.every((subTask) => subTask.status === 'completed')
				) {
					task.status = 'completed';
				} else if (
				// if only some subtasks are completed
					task.subTasks.some((subTask) => subTask.status === 'completed')
				) {
					task.status = 'in-progress';
				} else {
					task.status = 'todo';
				}
				return task;
			}
		});

		localStorage.setItem('tasks', JSON.stringify(updatedWithTaskStatus));
		setTasks((prev) => [...updatedWithTaskStatus]);
	};
	const handSubmit = (task2BCreated) => {
		let storedTasks = JSON.parse(localStorage.getItem('tasks'));
		if (subTaskCreate) {
			const updatedTasks = tasks.map((task) => {
				if (task.id === taskId) {
					task.subTasks.push(task2BCreated);
				}
				return task;
			});

			// save to into localStorage

			localStorage.setItem('tasks', JSON.stringify(updatedTasks));
			setTasks((prev) => [...updatedTasks]);
		} else {
			if (storedTasks) {
				storedTasks.push(task2BCreated);
			} else {
				storedTasks = [];
				storedTasks.push(task2BCreated);
			}
			localStorage.setItem('tasks', JSON.stringify(storedTasks));
			setTasks((prev) => [...storedTasks]);
		}

		setOpenModal(false);
	};

	const handleSubTask = (tskId) => {
		setTaskId(tskId);
		setSubTaskCreate(true);
		setOpenModal(true);
	};

	// function to delete an individual task (targets task id & removes from local storage)
	const handleDeleteTask = (idOfTask) => {
		const filteredTasks = tasks.filter((task) => task.id !== idOfTask);
		localStorage.setItem('tasks', JSON.stringify(filteredTasks));
		setTasks((prev) => [...filteredTasks]);
	};

	// function to reset/clear local storage
	const handleReset = () => {
		localStorage.clear();
		setTasks([]);
	};
	useEffect(() => {
		if (localStorage.getItem('tasks')) {
			const storedTasks = JSON.parse(localStorage.getItem('tasks'));
			setTasks((prev) => [...storedTasks]);
		}
	}, []);
	return (
		<section className='board'>
			<div className='container'>
				{openModal === true ? (
					<Modal onCloseModal={(e) => setOpenModal(false)}>
						<AddTask
							onTask={handSubmit}
							onCancel={(e) => setOpenModal(false)}
							subTask={subTaskCreate}
						/>
					</Modal>
				) : (
					''
				)}
				<div className='board__header'>
					<h1 className='board__title'>Workflow Manager</h1>
					<div className='board__actions'>
						<button className='board__add-task' onClick={handleClick}>
							+ Add Task
						</button>
						<button
							className='board__add-task board__add-task--reset'
							onClick={handleReset}
						>
							Reset
						</button>
					</div>
				</div>

				<div className='board__sections'>
					<div className='board-section board__todo'>
						<h2 className='board-section__title board-section__title--todo'>
							Backlog
						</h2>
						<div className='board-section__tasks'>
							{tasks
								.filter((task) => task.status === 'todo')
								.map((task) => (
									<TaskItem
										task={task}
										key={task.id}
										onSubTaskClick={(e) => handleSubTask(task.id)}
										onToggleSubStatus={handleToggleSubStatus}
										onDeleteClick={(e) => handleDeleteTask(task.id)}
									/>
								))}
						</div>
					</div>
					<div className='board-section board__progress'>
						<h2 className='board-section__title board-section__title--in-progress'>
							In Progess
						</h2>

						<div className='board-section__tasks'>
							{tasks
								.filter((task) => task.status === 'in-progress')
								.map((task) => (
									<TaskItem
										task={task}
										key={task.id}
										onSubTaskClick={(e) => handleSubTask(task.id)}
										onToggleSubStatus={handleToggleSubStatus}
										onDeleteClick={(e) => handleDeleteTask(task.id)}
									/>
								))}
						</div>
					</div>
					<div className='board-section board__completed'>
						<h2 className='board-section__title board-section__title--completed'>
							Completed
						</h2>

						<div className='board-section__tasks'>
							{tasks
								.filter((task) => task.status === 'completed')
								.map((task) => (
									<TaskItem
										task={task}
										key={task.id}
										onSubTaskClick={(e) => handleSubTask(task.id)}
										onToggleSubStatus={handleToggleSubStatus}
										onDeleteClick={(e) => handleDeleteTask(task.id)}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Board;

const changeSubTaskStatus = (tasks, taskId, subTaskId, status) => {
	const updatedTasks = tasks.map((task) => {
		if (task.id === taskId) {
			const updatedSubTaks = task.subTasks.map((subTask) => {
				if (subTask.id === subTaskId) {
					return { ...subTask, status };
				}
				return subTask;
			});
			task.subTasks = [...updatedSubTaks];
		}
		return task;
	});

	return updatedTasks;
};
