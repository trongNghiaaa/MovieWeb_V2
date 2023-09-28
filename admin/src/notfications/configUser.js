import moment from 'moment';

export const shortUppercaseId = (id) => {
    return id.slice(0, 8).toUpperCase();
};

export const formatDate = (date) => {
    return moment(date).format('LL');
};
