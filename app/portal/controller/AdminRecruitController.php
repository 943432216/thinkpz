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
		$data['department'] = trans_department($data['department']);

		$validate = Loader::validate('AdminRecruit');
		if ($validate->check($data)) {
			$data['admin_id'] = cmf_get_current_admin_id();
			$db_insert = Db::table('pz_recruit')->strict(false)->insert($data);
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
		$db = Db::table('pz_recruit')->where(['id' => $id])->delete();
		$db = 1;
		if ($db) {
			return ['code' => 200, 'msg' => '删除成功'];
		} else {
			return ['code' => 404, 'msg' => '删除失败，请重试'];
		}
	}

	public function delAll()
	{
		
		$post = input('post.ids');
		$del_result = Db::table('pz_recruit')->delete($post);

		if ($del_result) {
			$this->result('', 1, '删除成功');
		} else {
			$this->result('', 0, '删除失败');
		}
	}

	public function edit()
	{
		$id = input('id');
		$field = 'id,job_name,department,recruit_numbers,salary,work_place,work_experience,resume_email,guidance_line,post_time,expiry_time,job_duty,job_require';
		$data = Db::table('pz_recruit')->where('id', $id)->field($field)->find();
		// halt($data);
		$this->assign('job_data', $data);
		return $this->fetch();
	}

	public function editPost()
	{
		// halt($_POST);
		$post = input('post.');

		if (empty($post['id'])) {
			return $this->error('缺少文章id', 'portal/AdminRecruit/index');
		}

		$post['department'] = trans_department($post['department']);
		$update = Db::table('pz_recruit')->strict(false)->update($post);

		if (false === $update) {
			return $this->error("数据更新失败", 'portal/AdminRecruit/index');		
		} else {
			return $this->success("成功更新".$update."条数据", 'portal/AdminRecruit/index');
		}
		
	}

	public function postData()
	{

		$page = input('page', 1, 'intval');
		$limit = input('limit', 10, 'intval');

		$db_data = Db::table('pz_recruit')->limit($limit*($page - 1),$limit)->field('')->select();
		$count = Db::table('pz_recruit')->count();

		$array = [
			'code' => 0,
			'msg' => 'success',
			'count' => $count,
			'data' => $db_data,
		];

		return $array;
	}

}