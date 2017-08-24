
-- 查询每日线路运营数据

select * from line_statistic_daily 
where date>='2017-01-01' and date<='2017-02-01'; 

-- 
select line_no,org_id,org_name,bus_no,line_name,sum(service_num) as service_num,ticket_price,
sum(people_num) as people_num,sum(people_num*ticket_price) as money,
sum(refund_num) as refund_num from line_statistic_daily 
where date>='2017-06-01' and date<'2017-07-01' 
group by line_no order by org_id,line_no;



select * from travel_order as a,travel_payment as b where a.order_no=b.order_no;


select * from travel_order as a,travel_payment as b where a.id=b.travelOrderId and b.is_active;