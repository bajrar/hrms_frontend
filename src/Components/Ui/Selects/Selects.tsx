import { Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './selects.css';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface Iselects {
  onSelect?: any;
  options?: any[];
  value?: string;
  defaultValue?: string;
  className?: string;
  placeHolder?: string;
  name?: string;
  showDrop?: boolean;
  mode?: 'multiple' | 'tags' | undefined;
}

const Selects = ({
  onSelect,
  options,
  value,
  defaultValue,
  className,
  placeHolder,
  showDrop,
  mode,
}: Iselects) => {
  return (
    <div className='selects'>
      <Select
        showSearch
        defaultValue={defaultValue}
        optionFilterProp='children'
        onChange={onSelect}
        value={value}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        className={`selects working-condition ${className}`}
        options={options}
        suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
        placeholder={placeHolder}
        mode={mode}
        popupClassName='selects-dropdown'
      />
    </div>
  );
};

export default Selects;
