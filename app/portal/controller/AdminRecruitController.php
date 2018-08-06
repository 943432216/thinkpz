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
		//$db = Db::table('pz_recruit')->where(['id' => $id])->delete();
		$db = 1;
		if ($db) {
			return ['code' => 200, 'msg' => '删除成功'];
		} else {
			return ['code' => 404, 'msg' => '删除失败，请重试'];
		}
	}

	public function edit()
	{
		$id = input('id');
		$field = 'job_name,department,recruit_numbers,salary,work_place,work_experience,resume_email,guidance_line,post_time,expiry_time,job_duty,job_require';
		$data = Db::table('pz_recruit')->where('id', $id)->field($field)->find();
		// halt($data);
		$this->assign('job_data', $data);
		return $this->fetch();
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