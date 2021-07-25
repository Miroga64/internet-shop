export default function numberFormat(value){
    if (typeof(value) == 'number' && value != 0)
        return new Intl.NumberFormat().format(value) + '₽'
    else
        return 'Уточняйте цену в магазинах'
}