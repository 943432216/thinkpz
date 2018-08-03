<?php

/**
 * 品专官网-后台留言管理
 */

namespace app\portal\controller;

use cmf\controller\AdminBaseController;
use think\Loader;
use think\Db;

class AdminRecruitController extends AdminBaseController {
	public function index()
	{
		return $this->fetch();
	}

	public function add()
	{
		$data = input('post.');

		switch ($data['department']) {
			case 0:
				$data['department'] = '品牌部';
				break;
			case 1:
				$data['department'] = '风控部';
				break;
			case 2:
				$data['department'] = '业支部';
				break;
			case 3:
				$data['department'] = '媒介部';
				break;
			case 4:
				$data['department'] = '销售部';
				break;
			case 5:
				$data['department'] = '运营部';
				break;			
			default:
				$data['department'] = '品专集团';
				break;
		}

		$validate = Loader::validate('AdminRecruit');
		if ($validate->check($data)) {
			$data['admin_id'] = cmf_get_current_admin_id();
			$db_insert = Db::table('pz_recruit')->insert($data);
			if ($db_insert) {
				return $this->success('职位添加成功！', 'portal/AdminRecruit/index');
			} else {
				return $this->error('职位添加失败！', 'portal/AdminRecruit/index');
			}
		} else {
			return $this->error($validate->getError(), 'portal/AdminRecruit/index');
		}	
	}

	public function del()
	{
		$id = input('post.id');
		$db = Db::table('pz_recruit')->where(['id' => $id+100])->delete();
		return $db;
		if ($db) {
			# code...
		}
	}

	public function postData()
	{
		// halt($_POST);
		$db_data = Db::table('pz_recruit')->field('')->select();

		$array = [
			'code' => 0,
			'msg' => 'success',
			'count' => count($db_data),
			'data' => $db_data,
		];

		return $array;
	}

}