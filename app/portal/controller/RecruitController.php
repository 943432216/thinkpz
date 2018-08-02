<?php

namespace app\portal\controller;

use think\Controller;
use think\Db;

class RecruitController extends Controller
{
	public function fetchPosition()
	{
		$where = [
			'frozen' => 0,
		];
		$field = 'id,job_name,department,recruit_numbers,salary,work_place,work_experience,post_time,expiry_time,job_duty,job_require';
		$position = Db::table('pz_recruit')->where($where)->field($field)->select();

		$json['status'] = '200';
		$json['total'] = count($position);
		$json['data'] = $position;

		return json_encode($json, JSON_UNESCAPED_UNICODE);
	}
}