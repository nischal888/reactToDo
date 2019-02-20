import React from 'react';
import './Itemscomponents.css';

const Itemcomponents = (props) => {
    return (
        <div className="container">
            <form className="form-inline margin" onSubmit={(event) => props.submit(event)}>
                <div className="form-group">
                    <label>Add item:</label>
                    <input value={props.inputValue} onChange={props.change} type="text" className="form-control" />
                </div>

                <button className="btn btn-primary">Add item</button>
            </form>
            {
                (props.message !== '' || props.items.length === 0) && <p className="message text-danger">{props.message}</p>
            }
            {
                props.items.length > 0 &&
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Items</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        {!item['editstatus'] ?
                                            <td>{item['value']}</td> :
                                            <td>
                                                <input type="text" value={props.itemsHolder[index]} onChange={(e) => props.onEditInputChangeHandeler(index, e.target.value)} />
                                                <button onClick={(e) => props.updateItem(index)} type="button" className="btn btn-secondary btn-sm">Update</button>
                                            </td>
                                            // <td><input type="text" value={item['value']} onChange={(e) => props.onEditInputChangeHandeler(index, e.target.value)} /></td>
                                        }
                                        <td><button onClick={(e) => props.click(item)} disabled={item['editstatus']} type="button" className="btn btn-danger btn-sm">Delete</button>
                                            <button onClick={(e) => props.edititems(index)} type="button" className="btn btn-primary btn-sm">Edit</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">&nbsp;</td>
                            <td><button type="button" onClick={(e) => props.clearall()} className="btn btn-outline-danger"> Clear All</button></td>
                        </tr>
                    </tfoot>
                </table>
            }

        </div>
    )

}

export default Itemcomponents;