<?php
/**
 * 品专官网 - 留言模块
 */
namespace app\portal\controller;

use cmf\controller\AdminBaseController;
use think\Db;

class AdminMessageController extends AdminBaseController
{
	public function index()
	{
		return $this->fetch();
	}

	public function msgList()
	{
		$page = input('page', 1, 'intval');
		$limit = input('limit', 10, 'intval');
		$status = input('status', 0, 'intval');

		$field = 'id,msg_name,msg_phone,msg_email,message,create_time,custom_ip,custom_city';
		$where = [
			'msg_status' => $status,
		];
		$user_dt = Db::table('pz_custom_msg')->field($field)->where($where)->limit($limit*($page - 1),$limit)->select()->toArray();
		$count = Db::table('pz_custom_msg')->where($where)->count();

		foreach ($user_dt as $key => $value) {
			$user_dt[$key]['create_time'] = date('Y-y-d H:i:s', $value['create_time']);
		}

		$array = [
			'code' => 0,
			'msg' => 'success',
			'count' => $count ,
			'data' => $user_dt,
		];
		return $array;
	}

	//删除单个留言
	public function delOne()
	{
		$id = input('post.id');
		$db = Db::table('pz_custom_msg')->where(['id' => $id])->update(['msg_status' => -1]);
		if ($db) {
			return ['code' => 200, 'msg' => '删除成功'];
		} else {
			return ['code' => 404, 'msg' => '删除失败，请重试'];
		}
	}

	//批量删除留言
	public function delMany()
	{
		
		$post = input('post.ids');
		$del_result = Db::table('pz_custom_msg')->where(['id' => ['in', $post]])->update(['msg_status' => -1]);

		if ($del_result) {
			$this->result('', 1, '删除成功');
		} else {
			$this->result('', 0, '删除失败');
		}
	}
}