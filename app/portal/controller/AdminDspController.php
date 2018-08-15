<?php

/**
 * DSP注册用户管理
 */

namespace app\portal\controller;

use cmf\controller\AdminBaseController;
use think\Db;

class AdminDspController extends AdminBaseController
{
	public function index()
	{
		return $this->fetch();
	}

	// dsp注册信息列表
	public function dspList()
	{
		$page = input('page', 1, 'intval');
		$limit = input('limit', 10, 'intval');
		$status = input('status', 0, 'intval');

		$field = 'id,dsp_name,user_phone,create_time,user_ip,address';
		$where = [
			'status' => $status,
		];
		$user_dt = Db::table('pz_dsp_account')->field($field)->where($where)->limit($limit*($page - 1),$limit)->select()->toArray();
		$count = Db::table('pz_dsp_account')->where($where)->count();

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

	//注册信息审核通过列表
	public function dspPassedList()
	{
		return $this->fetch('passed');
	}

	//删除dsp注册数据
	public function delDsp()
	{
		$id = input('post.id');
		$db = Db::table('pz_dsp_account')->where(['id' => $id])->update(['status' => -1]);
		if ($db) {
			return ['code' => 200, 'msg' => '删除成功'];
		} else {
			return ['code' => 404, 'msg' => '删除失败，请重试'];
		}
	}

	//批量删除注册信息
	public function delAll()
	{
		
		$post = input('post.ids');
		$del_result = Db::table('pz_dsp_account')->where(['id' => ['in', $post]])->update(['status' => -1]);

		if ($del_result) {
			$this->result('', 1, '删除成功');
		} else {
			$this->result('', 0, '删除失败');
		}
	}

	//批量审核通过注册申请
	public function beMany()
	{
		$post = input('post.ids');
		$status = input('post.status');
		$del_result = Db::table('pz_dsp_account')->where(['id' => ['in', $post]])->update(['status' => $status]);

		if ($del_result) {
			$this->result('', 1, '审核操作成功');
		} else {
			$this->result('', 0, '审核操作失败');
		}
	}

	//审核通过一个注册申请
	public function beOne()
	{
		$id = input('post.id');
		$status = input('post.status');
		$del_result = Db::table('pz_dsp_account')->where('id', $id)->update(['status' => $status]);

		if ($del_result) {
			$this->result('', 1, '审核操作成功');
		} else {
			$this->result('', 0, '审核操作失败');
		}
	}
}