import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from './styles';

/**
 * `SelectField` is implemented as a controlled component,
 * with the current selection set through the `value` property.
 * The `SelectField` can be disabled with the `disabled` property.
 */
const MySelectField = ({ value, handleChange, label, opt1, opt2, opt3=null, opt4=null, opt5=null, opt6=null, opt7=null }) => (
      <div>
        <SelectField
          floatingLabelText={label}
          value={value}
          onChange={handleChange}
          fullWidth={true}
          floatingLabelStyle={styles.sflabel}
          style={styles.sfroot}
          menuItemStyle={styles.menuitem}
          menuStyle={styles.menu}
        >
          <MenuItem value={1} primaryText={opt1} />
          <MenuItem value={2} primaryText={opt2} />
          {opt3 && <MenuItem value={3} primaryText={opt3} />}
          {opt4 && <MenuItem value={4} primaryText={opt4} />}
          {opt5 && <MenuItem value={5} primaryText={opt5} />}
          {opt6 && <MenuItem value={6} primaryText={opt6} />}
          {opt7 && <MenuItem value={7} primaryText={opt7} />}
        </SelectField>
      </div>
);

export default MySelectField;