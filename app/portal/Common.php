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
		$begin = mktime(0,0,0,1,1,$year);
		$end = mktime(0,0,0,1,1,++$year);
		$db->where('published_time', '>=', $begin)
		   ->where('published_time', '<', $end);	                           
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