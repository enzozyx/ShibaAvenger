import React from 'react';
import { Icon, Button } from 'antd';


class Toolbar extends React.Component{

    constructor(props){
        super(props);
        const { 
            toggleType, 
            defaultToggel = true, 
            menus = [ 
            { type: 'plus', event: () => console.log('add') },
            { type: 'edit', event: () => console.log('edit') },
            { type: 'delete', event: () => console.log('delete') }
        ] } = props;
        this.state = { toggleType, defaultToggel, menus }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({ defaultToggel: !this.state.defaultToggel});
    }

    render() {
        return (
            <div key={this.state.toggleType} style={{ display: 'inline-block' , marginLeft: '10px'}}>
                <Button  type='default' onClick={this.toggle}><Icon type={this.state.toggleType}/></Button>
                <ol style={{ display: this.state.defaultToggel ? 'inline-block' : 'none', 
                listStyle: 'none', paddingLeft: '3px' }}>
                    {this.state.menus ? this.state.menus.map(menu => {
                        return (
                            <li key={menu.type} style={{ display: 'inline', marginRight: '1px' }}>
                                <Button  type='default' onClick={menu.event}>
                                    <Icon type={menu.type} />
                                </Button> 
                            </li>
                        );
                    }): ''}
                </ol>
            </div>
        );
    }

}
export default Toolbar;