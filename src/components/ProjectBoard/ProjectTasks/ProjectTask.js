import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteProjectTask} from '../../../actions/backlogActions';
import PropTypes from 'prop-types';

class ProjectTask extends Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onDeleteClick = (backlog_id, pt_id) => {
        this.props.deleteProjectTask(backlog_id, pt_id);
    }

    render() {
        const {project_task} = this.props;
        let priorityString = ["HIGH", "HIGH", "MEDIUM", "LOW"];
        let priorityClasses = ["bg-danger", "bg-danger", "bg-warning", "bg-info"];

        return (
            <div className="card mb-1 bg-light">
                <div className={`card-header text-primary text-light ${priorityClasses[project_task.priority]}`}>
                    ID: {project_task.projectSequence} -- Priority: {priorityString[project_task.priority]}
                </div>
                <div className="card-body bg-light">
                    <h5 className="card-title">{project_task.summary}</h5>
                    <p className="card-text text-truncate ">
                        {project_task.acceptanceCriteria}
                    </p>
                    <Link to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`} className="btn btn-primary">
                        View / Update
                    </Link>

                    <button 
                        className="btn btn-danger ml-4"
                        onClick={this.onDeleteClick.bind(this, project_task.projectIdentifier, project_task.projectSequence)} >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, {deleteProjectTask})(ProjectTask);