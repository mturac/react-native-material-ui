/* eslint-disable import/no-unresolved, import/extensions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
/* eslint-enable import/no-unresolved, import/extensions */
import Subheader from '../Subheader';
import Divider from '../Divider';
import ListItem from '../ListItem';
/* */
import Icon from "../Icon";
const propTypes = {
    title: PropTypes.string,
    key: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      /**
    * Will be rendered above the label as a content of the action.
    * If string, result will be <Icon name={icon} ...rest />
    * If ReactElement, will be used as is
    */
    icon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
        label: PropTypes.string,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
    })),
    divider: PropTypes.bool,
};
const defaultProps = {
    title: null,
    items: [],
    divider: false,
    style: {},
};
const contextTypes = {
    uiTheme: PropTypes.object.isRequired,
};

function getStyles(props, context) {
    const { drawerSection } = context.uiTheme;

    return {
        container: [
            drawerSection.container,
            props.style.container,
        ],
        item: [
            drawerSection.item,
            props.style.item,
        ],
        subheader: [
            drawerSection.subheader,
            props.style.subheader,
        ],
        icon: [
            drawerSection.icon,
            props.style.icon,
        ],
        value: [
            drawerSection.value,
            props.style.value,
        ],
        label: [
            drawerSection.label,
            props.style.label,
        ],
    };
}

class Section extends PureComponent {
    renderTitle = () => {
        const { title } = this.props;

        if (!title) {
            return null;
        }

        return <Subheader text={title} />;
    }
    render() {
        const { items, divider } = this.props;
        const { typography } = this.context.uiTheme;

        const styles = getStyles(this.props, this.context);
      
        return (
            <View>
                <View style={styles.container}>
                    {this.renderTitle(styles)}
                    {items && items.map((item) => {
       
                        let style = { primaryText: styles.primaryText != undefined ? styles.primaryText : typography.buttons, centerElementContainer:styles.centerElementContainer, container: styles.container };

                        if (item.active) {
                            style = this.context.uiTheme.drawerSectionActiveItem;
                        }
                  

                        return (
                            <ListItem
                                dense
                                key={item.key}
                                leftElement={item.icon}
                                centerElement={item.value}
                                onPress={item.onPress}
                                style={style}
                            />
                        );
                    })}
                </View>
                {divider && <Divider />}
            </View>
        );
    }
}

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;
Section.contextTypes = contextTypes;

export default Section;
