<?php 



/**
 *  获取某个年份的案例数据
 * @param  string $year  [年份，返回当年发布的案例]
 * @param  string $page [当前页码]
 * @param  string $number [每页条数]
 * @param  string $field [限制返回数据的字段]
 * @return [array]       [合作案例数据]
 */
function fetch_case_by_year($year='', $page, $number, $field='')
{
	$begin = $number*($page - 1);
	$where = [
		'a.post_status' => 1,
		'a.delete_time' => 0,
 	];
 	$db = \think\Db::name('portal_post')->alias('a')
								        ->join('portal_category_post b', 'a.id=b.post_id')
							            ->where('b.category_id', 4)
 										->where($where);

	if (!empty($year)) {
		$time_begin = mktime(0,0,0,1,1,$year);
		$time_end = mktime(0,0,0,1,1,++$year);
		$db->where('published_time', '>=', $time_begin)
		   ->where('published_time', '<', $time_end);	                           
	}
	
	$data = $db->order('published_time desc')
	           ->limit($begin, $number)
	           ->field($field)
	           ->select();
	return $data;
}

/**
 * [fetch_data 获取特定的文章数据]
 * @param  [int] 		$catagory [文章分类]
 * @param  [string] 	$field    [字段]
 * @param  [int] 		page      [页码]
 * @param  [int] 		$number   [每页条数，固定]
 * @return [collection] $data     [DB类返回数据集]
 */
function fetch_data($category, $field, $page, $number)
{
	$begin = $number*($page - 1);
	$data = \think\DB::name('portal_post')->alias('a')
								   ->join('portal_category_post b', 'a.id=b.post_id')
							       ->where('b.category_id', $category)
							       ->where('a.post_status',1)
							       ->where('a.delete_time',0)
								   ->field($field)		
								   ->limit($begin, $number)
								   ->select();
	return $data;
}

/**
 * [handle_img_url 处理图片的url]
 * @param  [type] $data [collection数据集]
 * @return [type]       [json数据]
 */
function handle_img_url($data)
{
	$data = $data->toArray();
	foreach ($data as $k => $v) {
		$data[$k]['more'] = cmf_get_image_url(json_decode($v['more'], true)['thumbnail']);
	}
	return $data;
}

function category_arts_sum($category, $post_status=false, $delete_time=false)
{
	$db = \think\DB::name('portal_post')->alias('a')
	                                    ->join('portal_category_post b', 'a.id=b.post_id')
	                                    ->where('b.category_id', $category);
	if (false == $post_status) {
		$db->where('post_status', '>=', 0);
	} elseif(in_array($post_status, ['0','1'])) {
		$db->where('post_status', $post_status);
	}
	                                    
	if (false == $delete_time) {
		$db->where('delete_time', '>=', 0);		
	} else {
		$db->where('delete_time', 0);
	}
	$data = $db->select();
	return count($data);
}

/**
 * 将数字符号替换成具体的部门
 * @param  string $department [前端传过来的部门数字字符]
 * @return [string]  $department [部门名称]
 */
function trans_department($department='')
{
	switch ($department) {
		case 0:
			$department = '品牌部';
			break;
		case 1:
			$department = '风控部';
			break;
		case 2:
			$department = '业支部';
			break;
		case 3:
			$department = '媒介部';
			break;
		case 4:
			$department = '销售部';
			break;
		case 5:
			$department = '运营部';
			break;			
		default:
			$department = '品专集团';
			break;
	}

	return $department;
}