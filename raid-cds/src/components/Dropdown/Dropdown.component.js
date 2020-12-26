import React, {useState, Fragment} from 'react';
import {Dropdown as RSDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import classNames from 'classnames';
import {ChevronDown} from 'react-feather';
import {Icon} from '../Icon/Icon.component.js';

export const Dropdown = ({options, placeholder, onChange}) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen)

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
    onChange(option);
  }

  return (
    <React.Fragment>
      <RSDropdown isOpen={isOpen} toggle={toggleDropdown}>
        <DropdownToggle
          tag="div"
          title="Assign">
          <div className="form-control d-flex flex-row">
            <div className="mr-auto">
              {selectedOption && (
                <React.Fragment>
                  <Icon src={selectedOption.icon} width={30} height={30} title={selectedOption.name}/>
                  {selectedOption.name}
                </React.Fragment>
              )}
              {!selectedOption && placeholder}
            </div>
            <ChevronDown size={20}/>
          </div>

        </DropdownToggle>

        <DropdownMenu style={{width: '100%'}}>
          { options.map((option, i) => (
            <DropdownItem tag="div" key={i} onClick={() => handleDropdownChange(option)}>
              <Icon src={option.icon} width={40} height={40} title={option.name} key={i}/>
              { selectedOption && selectedOption.name === option.name && <strong>{option.name}</strong>}
              { selectedOption && selectedOption.name !== option.name && `${option.name}`}
              { !selectedOption && option.name && `${option.name}`}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </RSDropdown>
    </React.Fragment>
  )
}