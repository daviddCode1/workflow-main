import React from 'react';
import './TaskItem.css';
import SubTask from '../Subtask';
const Index = ({ task, onSubTaskClick, onToggleSubStatus, onDeleteClick }) => {
	const handleToggle = (subTaskId, status) => {
		onToggleSubStatus(subTaskId, status, task.id);
	};
	return (
		<li className='task-item'>
			<div className='task-item__header'>
				<h4 className='task-item__title'>{task.title}</h4>
				<button className='task-item__add-sub' onClick={onSubTaskClick}>
					Add Subtask
				</button>
			</div>
			{task.subTasks.length > 0 && (
				<div className='task-item__subtasks'>
					<h5 className='task-item__subtasks-title'>SubTasks</h5>
					<ul className='task-item__subtasks-list'>
						{task.subTasks.map((sub) => (
							<SubTask subTask={sub} onToggle={handleToggle} />
						))}
					</ul>
				</div>
			)}

			<button className='task-item__delete' onClick={onDeleteClick}>
				Delete
			</button>
		</li>
	);
};

export default Index;
