import React, {Fragment, useEffect, useState} from 'react';

export const Tabs = (props) => {
  const {
    children,
    onChange
  } = props;

  const [activeKey, setActiveKey] = useState(null);
  useEffect(() => setActiveKey(props.activeKey),[]);

  useEffect(() => {
    setActiveKey(props.activeKey);
  }, [props.activeKey])

  const handleTabClick = (e, child) => {
    setActiveKey(child.props.tabKey)

    if (typeof onChange === 'function') {
      onChange(child.props.tabKey)
    }
  }

  const renderTab = (tab) => {
    const {children} = tab.props;

    return (
      <div className={`tab-pane fade${tab.props.tabKey === activeKey ? ' show active' : ' '}`}>
        {React.Children.map(children, child => child)}
      </div>
    )
  }

  return (
    <Fragment>
      <div style={{borderBottom: '1px solid rgba(160,175,185,.15)'}}>
        <div style={{borderColor: '#448bff'}}>
          <ul className="nav nav-tabs" role="tablist">
            {children && (
              <Fragment>
                {React.Children.map(children, child => {
                    return (
                      <li className="nav-item" key={child.props.tabKey} onClick={(e) => handleTabClick(e, child)}>
                        <a
                          className={`nav-link${child.props.tabKey === activeKey ? ' active' : ' '}`}>{child.props.title}</a>
                      </li>
                    )
                  }
                )}
              </Fragment>
            )}
          </ul>
        </div>
      </div>

      <div className="tab-content">
        {children && React.Children.map(children, child => renderTab(child))}
      </div>
    </Fragment>
  )
}
